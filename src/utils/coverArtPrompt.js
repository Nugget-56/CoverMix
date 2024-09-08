export function generateCoverArtPrompt(playlistAnalysis) {
    const { averageFeatures, characteristics } = playlistAnalysis;

    // Define color schemes based on mood and energy
    const colorScheme = characteristics.mood === 'Positive' 
        ? (characteristics.energy === 'Energetic' ? 'vibrant and warm' : 'soft and warm')
        : (characteristics.energy === 'Energetic' ? 'bold and cool' : 'muted and cool');

    // Define style based on danceability and acousticness
    const style = characteristics.danceability === 'Danceable'
        ? (characteristics.acousticness === 'Acoustic' ? 'organic and rhythmic' : 'electronic and dynamic')
        : (characteristics.acousticness === 'Acoustic' ? 'organic and calm' : 'electronic and ambient');

    // Create elements based on features
    const elements = [];
    if (averageFeatures.danceability > 0.6) elements.push('dancing figures');
    if (averageFeatures.acousticness > 0.6) elements.push('acoustic instruments');
    if (averageFeatures.instrumentalness > 0.6) elements.push('abstract musical symbols');
    if (averageFeatures.energy > 0.6) elements.push('energetic patterns');
    if (averageFeatures.valence > 0.6) elements.push('uplifting imagery');

    // Construct the prompt
    const prompt = `Create a playlist cover art with the following characteristics:
                    1. Use a ${colorScheme} color palette.
                    2. The overall style should be ${style}.
                    3. Incorporate elements such as ${elements.join(', ')}.
                    4. The mood should feel ${characteristics.mood.toLowerCase()} and ${characteristics.energy.toLowerCase()}.
                    5. Design should suggest a ${characteristics.danceability.toLowerCase()} and ${characteristics.acousticness.toLowerCase()} musical experience.
                    6. Use ${averageFeatures.tempo > 120 ? 'dynamic and flowing' : 'steady and structured'} compositional elements to reflect the tempo.
                    7. The image should be suitable for a square album cover format.`;

    return prompt;
}