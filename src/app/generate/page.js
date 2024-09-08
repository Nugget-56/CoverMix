'use client';

import React, { useState } from 'react';

async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
        {
            headers: {
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_IMAGE_GEN}`,
                "Content-Type": "application/json",
                "x-use-cache": "false"
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    const result = await response.blob();
    return result;
}

export default function Generate() {
    const [imageSrc, setImageSrc] = useState('/placeholder.png');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerate = async () => {
        setIsLoading(true);
        setError(null);
        
        //const seed = Math.floor(Math.random() * 1000000) + 1;
        const inputData = {
            "inputs": "Create a cover art for a music playlist which has a mix of pop and rock music",
            /*"parameters": {
                "seed": seed
            }*/
        };

        try {
            const response = await query(inputData);
            const imageUrl = URL.createObjectURL(response);
            setImageSrc(imageUrl);
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Generate Unique Image</h1>
            <button 
                onClick={handleGenerate}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                disabled={isLoading}
            >
                {isLoading ? 'Generating...' : 'Generate'}
            </button>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <img 
                src={imageSrc} 
                alt="Generated image" 
                className="w-[512px] h-[512px] object-cover"
            />
        </div>
    );
}