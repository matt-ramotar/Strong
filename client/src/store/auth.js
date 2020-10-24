import { REMOVE_AUTH, SET_USER, SET_TOKEN } from '../constants';
import { deleteLocalStorage, getLocalStorage, setLocalStorage } from '../utils';

export const setUser = user => ({
  type: SET_USER,
  user,
});

export const setToken = token => ({
  type: SET_TOKEN,
  token,
});

export const removeAuth = () => ({ type: REMOVE_AUTH });

export const loadUser = () => async dispatch => {
  const { user, token } = getLocalStorage();

  if (!user || !token) return;

  const res = await fetch('/verify_token', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  });

  if (res.ok) {
    dispatch(setUser(user));
    dispatch(setToken(token));
  } else {
    deleteLocalStorage();
    dispatch(removeAuth());
  }
};

export const register = (firstName, lastName, email, username, password) => async dispatch => {
  try {
    const res = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, username, password }),
    });
    if (res.ok) {
      const { token, user } = await res.json();
      setLocalStorage(token, user);
      dispatch(setToken(token));
      dispatch(setUser(user));
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};

export const login = (email, password) => async dispatch => {
  try {
    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const { token, user } = await res.json();
      setLocalStorage(token, user);
      dispatch(setToken(token));
      dispatch(setUser(user));
      return true;
    }

    return false;
  } catch (err) {
    console.log(err);
  }
};

export const logout = () => async (dispatch, getState) => {
  const {
    auth: { token },
  } = getState();

  const res = await fetch('/logout', {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.ok) {
    deleteLocalStorage();
    dispatch(removeAuth());
  }
};

export default function authReducer(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    case SET_TOKEN:
      return { ...state, token: action.token };
    case REMOVE_AUTH:
      return {};
    default:
      return state;
  }
}
