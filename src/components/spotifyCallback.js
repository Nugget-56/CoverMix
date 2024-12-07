'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAccessToken } from '@/utils/spotify/spotifyAuth';
import { revalidatePath } from 'next/navigation';

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const error = searchParams.get('error');
      const state = searchParams.get('state');
      const stateKey = localStorage.getItem('state_key');
      const codeVerifier = localStorage.getItem('code_verifier');

      if (error) {
        console.error('Error during Spotify authentication:', error);
        router.push('/?error=' + error);
        return;
      }

      if (state === null || state !== stateKey) {
        console.error('State mismatch');
        router.push('/?error=state_mismatch');
        return;
      }

      localStorage.removeItem('state_key');

      if (!code || !codeVerifier) {
        console.error('Missing code or code verifier');
        router.push('/?error=missing_code_or_verifier');
        return;
      }

      try {
        await getAccessToken(code);
        window.location.href = '/'; 
      } catch (error) {
        console.error('Error getting access token:', error);
        router.push('/?error=authentication_failed');
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div>
      <h1>Processing Spotify login...</h1>
    </div>
  );
}