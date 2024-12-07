export function generateCoverArtPrompt(playlistAnalysis) {
  const { averageFeatures, characteristics } = playlistAnalysis; 

  if (averageFeatures.instrumentalness > 0.5) {
    return 'Create a high quality, realistic art in an instrumental and musical aesthetic, pinterest style, dark room colours'
  }

  // Colour scheme
  const colorIntensity = averageFeatures.energy > 0.75  
    ? 'vibrant' 
    : averageFeatures.energy > 0.5 
    ? 'bright' 
    : averageFeatures.energy > 0.25 
    ? 'moderately bright' 
    : 'muted';
  const colorTemp = averageFeatures.valence > 0.4 ? 'warm' : 'cool';
  const colorScheme = `${colorIntensity} and ${colorTemp}`;

  // Style
  const composition = characteristics.tempo === 'Frenetic' || characteristics.energy === 'High Energy' 
    ? 'dynamic and chaotic' 
    : characteristics.tempo === 'Upbeat' || characteristics.energy === 'Energetic'
    ? 'lively and flowing'
    : characteristics.tempo === 'Moderate' || characteristics.energy === 'Moderate'
    ? 'structured and balanced'
    : 'calm and serene';

  const mood = averageFeatures.valence > 0.4 
    ? averageFeatures.loudness > -10 
      ? 'exuberant and lively' 
      : 'cheerful and gentle' 
    : averageFeatures.loudness > -10 
      ? 'powerful and dramatic' 
      : 'subtle and introspective';


  // Construct the prompt
  const prompt = `Create high quality art in ${colorScheme} colour scheme, pinterest style, ${mood} mood with a ${composition} composition`;

  return prompt;
}

//Create a high quality playlist cover art in country style and warm, fuzzy colour scheme. The image should evoke a relaxing and calm  mood

//Create a high quality, realistic looking playlist cover art in a motivation aesthetic. The image should evoke an inspirational mood

//Create a high quality, realistic art in an instrumental and musical aesthetic, pinterest style, dark room colours

//Create a high quality, realistic looking art in an sky aesthetic, pinterest style. The image should evoke a relaxing and euphoric mood

//Create high-quality art with a moderately bright and cool color palette. The composition should be dynamic and flowing, featuring a vintage-inspired style with sleek surfaces and geometric patterns. Evoke a contemplative and somber mood with a sense of movement and rhythm. Incorporate visual metaphors for vocal performances without using any text or explicit musical notation. The overall aesthetic should reflect an electronic and calm vibe, suitable for an upbeat playlist.

