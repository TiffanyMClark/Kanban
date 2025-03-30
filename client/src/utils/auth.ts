import { JwtPayload, jwtDecode } from "jwt-decode";

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return null;
  }
  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    const decoded: JwtPayload = jwtDecode(token);
    if (decoded.exp) {
      return decoded.exp * 1000 < Date.now();
    }
    return false;
  }

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem("authToken") || "";
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem("authToken", idToken);
    // TODO: redirect to the home page
    window.location.href = "/";
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem("authToken");
    // TODO: redirect to the login page
    window.location.href = "/login";
  }
}

export default new AuthService();
