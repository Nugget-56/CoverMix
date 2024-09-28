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
    }
    return new Error(`Error in Spotify API request: ${error.message}`);
}

export async function getPlaylist(playlistId, accessToken) {
    const apiUrl = `https://api.spotify.com/v1/playlists/${playlistId}?fields=name%2Ctracks%28total%2Citems%28track%28id%29%29%29`;

    const config = {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
    };

    try {
        const response = await axios.get(apiUrl, config);
        const data = {
            name: response.data.name,
            totalTracks: response.data.tracks.total,
            tracks: response.data.tracks.items.map(item => item.track?.id).filter(Boolean)
        }
        return data;
        //return response.data.items.map(item => item.track?.id).filter(Boolean);
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

//---------------Mini Mix-----------------------------------------

export async function getLikedSongs(accessToken) {
    
  const apiUrl = `https://api.spotify.com/v1/me/tracks?limit=50`;

  const config = {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  };

  let allSongs = [];
  let nextUrl = apiUrl;

  try {
    while (nextUrl) {
      const response = await axios.get(nextUrl, config);
      allSongs = allSongs.concat(response.data.items.map(item => item.track.name));
      nextUrl = response.data.next; 
    }
    return allSongs;
  } catch (error) {
    throw handleSpotifyError(error);
  } 
}

