import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = () => {
      const accessToken = localStorage.getItem('access_token');

      if (!accessToken) {
        router.push('/404');
      } else {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, [router]);

  return { isLoggedIn };
}

export function usePlaylist() {
  const [isGenerated, setIsGenerated] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const playlistFeatures = localStorage.getItem('playlistFeatures');

      if (playlistFeatures) {
        setIsGenerated(true);
      }
    };

    checkLoginStatus();
  }, []);

  return { isGenerated };
}