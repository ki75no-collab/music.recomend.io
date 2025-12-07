import axios from 'axios';

const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

export const getSimilarTracks = async (artist, track, apiKey) => {
    if (!apiKey) {
        throw new Error('API Key is missing');
    }

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                method: 'track.getsimilar',
                artist: artist,
                track: track,
                api_key: apiKey,
                format: 'json',
                limit: 12, // Fetch top 12 similar tracks
                autocorrect: 1,
            },
        });

        if (response.data.error) {
            throw new Error(response.data.message);
        }

        // Last.fm confusingly returns empty object or just meta info if no similar tracks found sometimes
        const tracks = response.data.similartracks?.track || [];
        return tracks;
    } catch (error) {
        console.error('Error fetching similar tracks:', error);
        throw error;
    }
};
