import { TOKEN, USER } from '../constants';

export default function getLocalStorage() {
  const user = JSON.parse(window.localStorage.getItem(USER));
  const token = window.localStorage.getItem(TOKEN);
  return { user, token };
}
