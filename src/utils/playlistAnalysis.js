export function analyzePlaylistFeatures(audioFeatures) {
    const features = {
        danceability: 0,
        energy: 0,
        speechiness: 0,
        acousticness: 0,
        instrumentalness: 0,
        liveness: 0,
        valence: 0,
        tempo: 0
    };

    const trackCount = audioFeatures.length;

    //Get total feature value
    audioFeatures.forEach(feature => {
        features.danceability += feature.danceability;
        features.energy += feature.energy;
        features.speechiness += feature.speechiness;
        features.acousticness += feature.acousticness;
        features.instrumentalness += feature.instrumentalness;
        features.liveness += feature.liveness;
        features.valence += feature.valence;
        features.tempo += feature.tempo;
    }); 

    // Calculate average feature value
    for (let feature in features) {
        features[feature] /= trackCount;
    }

    const mood = features.valence > 0.5 ? 'Positive' : 'Melancholic';
    const energy = features.energy > 0.5 ? 'Energetic' : 'Calm';
    const acousticness = features.acousticness > 0.5 ? 'Acoustic' : 'Electronic';
    const tempo = features.tempo > 120 ? 'Upbeat' : 'Chill';
    const instrumentalness = features.instrumentalness > 0.5 ? 'Instrumental' : 'Vocal';

    return {
        averageFeatures: features,
        characteristics: {
            mood,
            energy,
            acousticness,
            tempo,
            instrumentalness
        }
    };
}