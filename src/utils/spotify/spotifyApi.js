import axios from 'axios';

function handleSpotifyError(error) {
  if (error.response) {
    if (error.response.status === 401) {
      return 'Unauthorized: Access token is invalid or expired. Please log in again.';
    } else if (error.response.status === 403) {
      return 'Forbidden: Insufficient permissions to access this resource';
    } else if (error.response.status === 404) {
      return 'Not Found: The specified resource does not exist';
    } else if (error.response.status === 429) {
      return 'Rate Limit Exceeded: Too many requests to Spotify API';
    }
  }
  return `Error in Spotify API request: ${error.message}`;
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
        return {data, error: null};
        //return response.data.items.map(item => item.track?.id).filter(Boolean);
    } catch (error) {
        return {data: null, error: handleSpotifyError(error)};
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
        return {data: response.data.audio_features, error: null};
    } catch (error) {
        return {data: null, error: handleSpotifyError(error)};
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
    return {data: response.data, error: null};
  } catch (error) {
    return {data: null, error: handleSpotifyError(error)};
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
      const songs = response.data.items.map(item => ({
        id: item.track.id,
        name: item.track.name,
        artist: item.track.artists[0].id,
        release_year: item.track.album.release_date.slice(0, 4),
        added_at: item.added_at
      }));
      allSongs = allSongs.concat(songs);
      nextUrl = response.data.next; 
    }
    return {data: allSongs, error: null};
  } catch (error) {
    return {data: null, error: handleSpotifyError(error)} ;
  } 
}

export async function getSongGenres(artistIds, accessToken) {
  const apiUrl = `https://api.spotify.com/v1/artists?ids=${artistIds.join(',')}`;

  const config = {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  };

  try {
    const response = await axios.get(apiUrl, config);
    const genres = response.data.artists.map(artist => artist.genres);
    return {data: genres, error: null};
  } catch (error) {
    return {data: null, error: handleSpotifyError(error)};
  }
}


//Splitting functions-------------
export async function splitByDecade(songs) {
  const decades = {
    2020: [],
    2010: [],
    2000: [],
    1990: [],
    1980: [],
    1970: [],
    1960: []
  };

  for(const song of songs){
    const releaseDecade = Math.floor(parseInt(song.release_year) / 10) * 10;
    if(decades[releaseDecade]){
      const songData = {
        id: song.id,
        name: song.name,
      }
      decades[releaseDecade].push(songData);
    }
  }
  return decades;
}

export async function splitByGenre(songs, accessToken) {
  const genresArray = {
    'rock': [],
    'pop': [],
    'hip-hop': [], 
    'electronic': [],
    'country': [],
  }

  const artistIds = songs.map(song => song.artist);
  const genres = await getSongGenres(artistIds, accessToken);

  return genres;
}


