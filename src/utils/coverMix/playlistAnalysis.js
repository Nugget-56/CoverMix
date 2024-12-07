export function analyzePlaylistFeatures(audioFeatures) {
    const features = {
        danceability: 0,
        energy: 0,
        speechiness: 0,
        acousticness: 0,
        instrumentalness: 0,
        loudness: 0,
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
        features.loudness += feature.loudness;
        features.valence += feature.valence;
        features.tempo += feature.tempo;
    }); 

    // Calculate average feature value
    for (let feature in features) {
        features[feature] /= trackCount;
    }

    const getMood = (valence, energy) => {
        if (valence > 0.7) {
            return energy > 0.6 ? 'Euphoric' : 'Cheerful';
        }
        if (valence > 0.5) {
            return energy > 0.6 ? 'Upbeat' : 'Positive';
        }
        if (valence > 0.3) {
            return energy > 0.6 ? 'Motivational' : 'Melancholic';
        }
        return energy > 0.6 ? 'Dramatic' : 'Somber';
    };
    
    const getEnergy = (energy) => {
        if (energy > 0.7) return 'Explosive';
        if (energy > 0.5) return 'Energetic';
        if (energy > 0.2) return 'Calm';
        return 'Tranquil';
    };
    
    const getAcousticness = (acousticness) => {
        if (acousticness > 0.6) return 'Acoustic';
        if (acousticness > 0.4) return 'Balanced';
        return 'Electronic';
    };
    
    const getTempo = (tempo) => {
        if (tempo > 160) return 'Frenetic';
        if (tempo > 140) return 'Upbeat';
        if (tempo > 120) return 'Energetic';
        if (tempo > 100) return 'Moderate';
        if (tempo > 80) return 'Relaxed';
        return 'Slow';
    };
    
    const getInstrumentalness = (instrumentalness) => {
        if (instrumentalness > 0.45) return 'Instrumental';
        if (instrumentalness > 0.3) return 'Balanced';
        return 'Vocal';
    };
    
    const getIntensity = (loudness) => {
        if (loudness > -4) return 'Very Intense';
        if (loudness > -8) return 'Intense';
        if (loudness > -12) return 'Moderate';
        if (loudness > -16) return 'Soft';
        return 'Very Soft';
    };
    
    const mood = getMood(features.valence);
    const energy = getEnergy(features.energy);
    const acousticness = getAcousticness(features.acousticness);
    const tempo = getTempo(features.tempo);
    const instrumentalness = getInstrumentalness(features.instrumentalness);
    const intensity = getIntensity(features.loudness);

    return {
        averageFeatures: features,
        characteristics: {
            mood,
            energy,
            acousticness,
            tempo,
            instrumentalness,
            intensity
        }
    };
}