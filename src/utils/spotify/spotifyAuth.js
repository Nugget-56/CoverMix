const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const redirectUrl = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const scope = 'user-read-email playlist-read-private user-library-read';

function base64UrlEncode(hashed) {
  return btoa(String.fromCharCode(...new Uint8Array(hashed)))
  .replace(/\+/g, '-')
  .replace(/\//g, '_')
  .replace(/=/g, '');
}

function generateCodeVerifier(length) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}


async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const hashed = await crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(hashed);
}

function generateRandomString(length) {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

export async function redirectToSpotifyAuthorize() {
  const codeVerifier = generateCodeVerifier(64);
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  const state = generateRandomString(16);

  localStorage.setItem('code_verifier', codeVerifier);
  localStorage.setItem('state_key', state);

  const authUrl = new URL(authorizationEndpoint);

  const params = {
    response_type: 'code',
    client_id: clientId,
    scope: scope,
    state: state,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: redirectUrl,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
}

export async function getAccessToken(code) {
  const codeVerifier = localStorage.getItem('code_verifier');

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUrl,
      code_verifier: codeVerifier,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error_description || 'Failed to fetch access token');
  }

  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('expires_at', Date.now() + data.expires_in * 1000);

  localStorage.removeItem('code_verifier');

  return data.access_token;
}

export function getAccessTokenFromStorage() {
  const accessToken = localStorage.getItem('access_token');
  const expiresAt = localStorage.getItem('expires_at');

  if (!accessToken || !expiresAt) {
    return null;
  }

  if (Date.now() > parseInt(expiresAt)) {
    return null;
  }

  return accessToken;
}