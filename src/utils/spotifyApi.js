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

export async function getPlaylistTracks(playlistId, accessToken) {
    
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

export async function getAudioFeatures(trackIds, accessToken) {

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

export async function getPlaylistDetails(playlistId, accessToken) {
  const apiUrl = `https://api.spotify.com/v1/albums/${playlistId}`;

  const config = {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  };

  try {
    const response = await axios.get(apiUrl, config);

    const data = {
        name: response.data.name,
        description: response.data.description,
    }

    return data;
      
  } catch (error) {
    throw handleSpotifyError(error);
  }

}

export async function setPlaylistCover(playlistId, imageUrl, accessToken) {
  const apiUrl = `https://api.spotify.com/v1/playlists/${playlistId}/images`

  const config = {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'image/jpeg'
    }
  };

  const data = {
    url: imageUrl
  }

  try {
    const response = await axios.put(apiUrl, data, config);
    return response.data;
  } catch (error) {
    throw handleSpotifyError(error);
  }
}
