import { NextResponse } from 'next/server';
import { getPlaylistTracks, getAudioFeatures } from '@/utils/spotifyApi';
import { analyzePlaylistFeatures } from '@/utils/playlistAnalysis'; 
import { generateCoverArtPrompt } from '@/utils/coverArtPrompt';

async function getAccessToken() {
  // Placeholder, retrieve the token from a secure storage
  return process.env.SPOTIFY_ACCESS_TOKEN;
}

export async function POST(request) {
  try {
    const { playlistUrl } = await request.json();
    const playlistId = playlistUrl.split('/').pop().split('?')[0];
    const accessToken = await getAccessToken();

    const trackIds = await getPlaylistTracks(playlistId);

    if (trackIds.length === 0) {
        return NextResponse.json({ error: 'No tracks found in the playlist' }, { status: 404 });
    }

    const audioFeatures = await getAudioFeatures(trackIds);
    const playlistFeatures = analyzePlaylistFeatures(audioFeatures);
    const coverArtPrompt = generateCoverArtPrompt(playlistFeatures);

    return NextResponse.json({ 
        playlistFeatures, 
        coverArtPrompt 
    });

  } catch (error) {
    console.error('Error processing playlist:', error.message);

    if (error.message.includes('Unauthorized')) {
        return NextResponse.json({ error: 'Authentication failed. Please log in again.' }, { status: 401 });
    } else if (error.message.includes('Forbidden')) {
        return NextResponse.json({ error: 'You do not have permission to access this playlist.' }, { status: 403 });
    } else if (error.message.includes('Not Found')) {
        return NextResponse.json({ error: 'The specified playlist does not exist.' }, { status: 404 });
    } else if (error.message.includes('Rate Limit Exceeded')) {
        return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    return NextResponse.json({ 
        error: 'An unexpected error occurred while processing the playlist.',
        details: error.message 
    }, { status: 500 });
  }
}