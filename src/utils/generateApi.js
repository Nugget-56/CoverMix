export async function generateImage(prompt) {
  try {
    const response = await fetch('/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate image');
    }

    const data = await response.blob();
    const image = URL.createObjectURL(data);
    return image;
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to generate image');
  }
}