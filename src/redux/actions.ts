// actions.ts

import User from "@/interfaces/User";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const SET_USER = 'SET_USER';

interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}

export const setUserAction = (user: User): SetUserAction => {
  return { type: SET_USER, payload: user };
};

export const login = () => ({
  type: LOGIN,
});

export const logout = () => ({
  type: LOGOUT,
});