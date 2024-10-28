import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = () => {
      const playlistFeatures = localStorage.getItem('playlistFeatures');

      if (!playlistFeatures) {
        router.push('/404');
      } else {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, [router]);

  return { isLoggedIn };
}