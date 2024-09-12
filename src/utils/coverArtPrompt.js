export function generateCoverArtPrompt(playlistAnalysis) {
    const { averageFeatures, characteristics } = playlistAnalysis;

    // Colour scheme
    const colorScheme = characteristics.mood === 'Positive' 
        ? (characteristics.energy === 'Energetic' ? 'vibrant and warm' : 'soft and warm')
        : (characteristics.energy === 'Energetic' ? 'bold and cool' : 'muted and cool');

    // Style
    const style = characteristics.instrumentalness === 'Instrumental'
        ? (characteristics.acousticness === 'Acoustic' ? 'organic and natural' : 'electronic and abstract')
        : (characteristics.acousticness === 'Acoustic' ? 'organic and calm' : 'futuristic and digital');

    const elements = averageFeatures.valence >= 0.6 
        ? 'uplifting imagery'
        : 'melancholic imagery';

    // Construct the prompt
    const prompt = `Create a playlist cover art `;

    return prompt;
}

//Create a high quality playlist cover art in country style and warm, fuzzy colour scheme. The image should evoke a relaxing and calm  mood

//Create a high quality, realistic looking playlist cover art in a motivation aesthetic. The image should evoke an inspirational mood

//Create a high quality, realistic art in an instrumental and musical aesthetic, pinterest style, dark room colours

//Create a high quality, realistic looking art in an sky aesthetic, pinterest style. The image should evoke a relaxing and euphoric mood

//