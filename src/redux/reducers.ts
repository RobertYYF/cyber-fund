import {LOGIN, LOGOUT, SET_USER} from './actions';
import User from "@/interfaces/User";

export interface AppState {
  isLoggedIn: boolean;
  user: User | null;
}

const initialState: AppState = {
  isLoggedIn: false,
  user: null,
};

const appReducer = (state = initialState, action): AppState => {
  console.log('reducer actions', action);
    switch (action.type) {
      case LOGIN:
        console.log('login actions', action);
        return {
          ...state,
          isLoggedIn: true,
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
        };
      case SET_USER:
        return {
          ...state,
          user: action.payload
        };
      default:
        return state;
    }
};

export default appReducer;