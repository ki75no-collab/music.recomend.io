import React from 'react';

const RecommendationList = ({ tracks }) => {
    if (!tracks || tracks.length === 0) {
        return null;
    }

    return (
        <div className="w-full max-w-4xl mx-auto mt-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Similar Tracks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tracks.map((track, index) => (
                    <div
                        key={`${track.name}-${index}`}
                        className="group relative bg-gray-800/40 p-4 rounded-xl border border-gray-700 hover:bg-gray-800/60 transition-all hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1"
                    >
                        <div className="flex flex-col h-full justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors line-clamp-1" title={track.name}>
                                    {track.name}
                                </h3>
                                <p className="text-sm text-gray-400 mb-2">{track.artist?.name}</p>
                                {/* Last.fm often gives images, but sometimes they are empty placeholders */}
                                {track.image && track.image[2]['#text'] ? (
                                    <img
                                        src={track.image[2]['#text']}
                                        alt={`${track.name} cover`}
                                        className="w-full h-48 object-cover rounded-lg mb-3 shadow-md bg-gray-900"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-48 bg-gray-900 rounded-lg mb-3 flex items-center justify-center text-gray-600">
                                        <span className="text-4xl">🎵</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between items-center mt-2">
                                <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                                    {Math.round(track.match * 100)}% Match
                                </span>
                                <a
                                    href={track.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-purple-400 hover:text-purple-300 hover:underline"
                                >
                                    View on Last.fm &rarr;
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendationList;
