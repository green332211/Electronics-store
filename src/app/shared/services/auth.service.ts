import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  public login(user): Observable<unknown> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken)
      )
  }

  private setToken(response) {
    if (response) {
      const expData = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token-exp', expData.toString());
      localStorage.setItem('fb-token', response.idToken);
    } else {
      localStorage.clear();
    }
  }

 get token () {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token')
 }

 public logout() {
    this.setToken(null);
 }

 public isAuthenticated() {
    return !!this.token;
 }
}
