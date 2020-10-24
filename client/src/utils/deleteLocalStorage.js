import { TOKEN, USER } from '../constants';

export default function deleteLocalStorage() {
  window.localStorage.removeItem(TOKEN);
  window.localStorage.removeItem(USER);
}
