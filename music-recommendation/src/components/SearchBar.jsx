import React, { useState } from 'react';

const SearchBar = ({ onSearch, isLoading }) => {
    const [artist, setArtist] = useState('');
    const [track, setTrack] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (artist.trim() && track.trim()) {
            onSearch(artist, track);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-gray-800/50 rounded-xl shadow-lg backdrop-blur-sm border border-gray-700">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label htmlFor="artist" className="block text-sm font-medium text-gray-300 mb-1">
                        Artist Name
                    </label>
                    <input
                        id="artist"
                        type="text"
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white transition-all placeholder-gray-500"
                        placeholder="e.g. Radiohead"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label htmlFor="track" className="block text-sm font-medium text-gray-300 mb-1">
                        Track Name
                    </label>
                    <input
                        id="track"
                        type="text"
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white transition-all placeholder-gray-500"
                        placeholder="e.g. Creep"
                        value={track}
                        onChange={(e) => setTrack(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 py-2.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Searching...
                        </span>
                    ) : (
                        'Get Recommendations'
                    )}
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
