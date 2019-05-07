import { BehaviorSubject } from 'rxjs';
import { AUTH_TOKEN } from '../constants';

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem(AUTH_TOKEN))
);

export const authenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  }
};

function login(user) {
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  localStorage.setItem(AUTH_TOKEN, JSON.stringify(user));
  currentUserSubject.next(user);
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem(AUTH_TOKEN);
  currentUserSubject.next(null);
}
