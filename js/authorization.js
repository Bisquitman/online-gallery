import { ACCESS_KEY, API_URL_AUTH, API_URL_TOKEN, REDIRECT_URI, RESPONSE_TYPE, SCOPE, SECRET_KEY } from "./const.js";
import { getUserData } from "./getUserData.js";

const getToken = (code) => {
  const url = new URL(API_URL_TOKEN);

  url.searchParams.append('client_id', ACCESS_KEY);
  url.searchParams.append('client_secret', SECRET_KEY);
  url.searchParams.append('redirect_uri', REDIRECT_URI);
  url.searchParams.append('code', code);
  url.searchParams.append('grant_type', 'authorization_code');

  return fetch(url, {
    method: 'POST',
  })
    .then(response => response.json())
    .then(data => {
      return data.access_token;
    });
};

const checkLogin = async () => {
  const url = new URL(location.href);
  const code = url.searchParams.get('code');
  if (code) {
    const token = await getToken(code);

    localStorage.setItem('Bearer', token);

    const url = new URL(location);
    url.searchParams.delete('code');
    history.pushState(null, document.title, url);
    return true;
  } else if (localStorage.getItem('Bearer')) {
    return true;
  }
  return false;
};

const login = () => {
  const url = new URL(API_URL_AUTH);

  url.searchParams.append('client_id', ACCESS_KEY);
  url.searchParams.append('redirect_uri', REDIRECT_URI);
  url.searchParams.append('response_type', RESPONSE_TYPE);
  url.searchParams.append('scope', SCOPE);

  location.href = url;
};

const logout = (e) => {
  const btn = e.target;
  if (confirm('Вы уверены?')) {
    localStorage.removeItem('Bearer');
    btn.textContent = '';
    btn.style.backgroundImage = '';
    btn.removeEventListener('click', logout);
    btn.addEventListener('click', login);
  }
};


export const authorization = async (btn) => {
  if (await checkLogin()) {
    const userData = await getUserData();
    btn.textContent = userData.username;
    btn.style.backgroundImage = `url(${userData.profile_image.medium})`;
    btn.addEventListener('click', logout);
  } else {
    btn.addEventListener('click', login);
  }
};