import axios from 'axios';

function handleSpotifyError(error) {
    if (error.response) {
        if (error.response.status === 401) {
            return new Error('Unauthorized: Access token is invalid or expired. Please log in again.');
        } else if (error.response.status === 403) {
            return new Error('Forbidden: Insufficient permissions to access this resource');
        } else if (error.response.status === 404) {
            return new Error('Not Found: The specified resource does not exist');
        } else if (error.response.status === 429) {
            return new Error('Rate Limit Exceeded: Too many requests to Spotify API');
        }
    } else if (error.request) {
        return new Error('No response received from Spotify API');
    }
    return new Error(`Error in Spotify API request: ${error.message}`);
}

export async function getAccessToken() {
  return process.env.SPOTIFY_ACCESS_TOKEN;
}

export async function getPlaylistTracks(playlistId) {
    const accessToken = process.env.SPOTIFY_ACCESS_TOKEN;
    const apiUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?fields=items%28track%28id%29%29`;

    const config = {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
    };

    try {
        const response = await axios.get(apiUrl, config);
        return response.data.items.map(item => item.track?.id).filter(Boolean);
    } catch (error) {
        throw handleSpotifyError(error);
    }
}

export async function getAudioFeatures(trackIds) {
    const accessToken = process.env.SPOTIFY_ACCESS_TOKEN;
    const apiUrl = `https://api.spotify.com/v1/audio-features?ids=${trackIds.join(',')}`;

    const config = {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
    };

    try {
        const response = await axios.get(apiUrl, config);
        return response.data.audio_features;
    } catch (error) {
        throw handleSpotifyError(error);
    }
}