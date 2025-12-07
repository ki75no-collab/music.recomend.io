import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import RecommendationList from './components/RecommendationList';
import { getSimilarTracks } from './services/lastfm';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem('lastfm_api_key');
    if (storedKey) {
      setApiKey(storedKey);
    } else {
      setShowSettings(true);
    }
  }, []);

  const handleSaveKey = (e) => {
    e.preventDefault();
    const inputKey = e.target.elements.key.value;
    if (inputKey) {
      localStorage.setItem('lastfm_api_key', inputKey);
      setApiKey(inputKey);
      setShowSettings(false);
    }
  };

  const handleSearch = async (artist, track) => {
    if (!apiKey) {
      setError('Please set your Last.fm API Key first.');
      setShowSettings(true);
      return;
    }

    setLoading(true);
    setError(null);
    setTracks([]);

    try {
      const results = await getSimilarTracks(artist, track, apiKey);
      if (results.length === 0) {
        setError('No similar tracks found. Try a different song.');
      } else {
        setTracks(results);
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching recommendations.');
    } finally {
      setLoading(false);
    }
  };

  const clearKey = () => {
    localStorage.removeItem('lastfm_api_key');
    setApiKey('');
    setShowSettings(true);
  };

  return (
    <div className="min-h-screen bg-[#121212] bg-gradient-to-br from-[#121212] via-[#1a1a2e] to-[#2a1a2e] text-white py-12 px-4 transition-colors duration-500">
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 text-gray-400 hover:text-white transition-colors"
          title="Settings"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.41.41.492 1.051.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.372.399.29 1.04-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.02-.398-1.11-.94l-.149-.894c-.07-.424-.384-.764-.78-.93-.398-.164-.855-.142-1.205.108l-.737.527a1.125 1.125 0 01-1.45-.12l-.773-.774c-.41-.41-.492-1.051-.12-1.45l.527-.737c.25-.35.272-.806.107-1.204-.165-.397-.505-.71-.93-.78l-.893-.15c-.543-.09-.94-.56-.94-1.109v-1.094c0-.55.397-1.02.94-1.11l.893-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738c-.372-.399-.29-1.04.12-1.45l.774-.773a1.125 1.125 0 011.449-.12l.738.527c.35.25.806.272 1.203.107.397-.165.71-.505.781-.929l.149-.894z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      <div className="container mx-auto flex flex-col items-center">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 animate-fade-in-down">
            Music Recomendation
          </h1>
          <p className="text-gray-400 text-lg">Discover music that shares the same soul.</p>
        </header>

        {showSettings && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 p-8 rounded-2xl w-full max-w-md border border-gray-700 shadow-2xl">
              <h2 className="text-2xl font-bold mb-4">Setup API Key</h2>
              <p className="text-gray-300 mb-6 text-sm">
                To use this app, you need a free Last.fm API Key.
                <br />
                <a href="https://www.last.fm/api/account/create" target="_blank" rel="noreferrer" className="text-purple-400 underline hover:text-purple-300">
                  Get one here
                </a>.
              </p>
              <form onSubmit={handleSaveKey}>
                <input
                  name="key"
                  defaultValue={apiKey}
                  placeholder="Paste your API Key here"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg mb-4 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  required
                />
                <div className="flex gap-3 justify-end">
                  {apiKey && (
                    <button type="button" onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-white px-4 py-2">
                      Cancel
                    </button>
                  )}
                  <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg font-medium">
                    Save Key
                  </button>
                </div>
              </form>
              {apiKey && (
                <div className="mt-6 pt-4 border-t border-gray-700 text-center">
                  <button onClick={clearKey} className="text-red-400 text-sm hover:text-red-300">
                    Remove stored key
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <SearchBar onSearch={handleSearch} isLoading={loading} />

        {error && (
          <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 text-red-200 rounded-lg max-w-md text-center">
            {error}
          </div>
        )}

        <RecommendationList tracks={tracks} />
      </div>
    </div>
  );
}

export default App;
