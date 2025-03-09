// ask-mkulima/frontend/services/authService.ts
import { UserCredentials, User } from '../types/user';
import { api } from '../utils/api';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  userId: number;
  exp: number;
  // Add other properties if needed
}

export const AuthService = {
  async login(credentials: UserCredentials): Promise<User> {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token } = response.data;
      Cookies.set('authToken', token, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      return this.getUser() as User;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Login failed.');
      } else if (error.request) {
        throw new Error('Network error. Please try again.');
      } else {
        throw new Error('An unexpected error occurred.');
      }
    }
  },

  async logout(): Promise<void> {
    Cookies.remove('authToken');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  },

  async register(userData: User): Promise<User> {
    try {
      const response = await api.post('/auth/register', userData);
      const { token } = response.data;
      Cookies.set('authToken', token, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      return this.getUser() as User;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Registration failed.');
      } else if (error.request) {
        throw new Error('Network error. Please try again.');
      } else {
        throw new Error('An unexpected error occurred.');
      }
    }
  },

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      return !!Cookies.get('authToken');
    }
    return false;
  },

  getUser(): User | null {
    const token = Cookies.get('authToken');
    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          this.logout();
          return null;
        }

        return api.get(`/users/${decodedToken.userId}`).then((response) => response.data).catch(() => {
          this.logout();
          return null;
        });
      } catch (error) {
        console.error('Error decoding or fetching user data:', error);
        this.logout();
        return null;
      }
    }
    return null;
  },

  async forgotPassword(email: string): Promise<void> {
    try {
      await api.post('/auth/forgot-password', { email });
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to send password reset email.');
      } else if (error.request) {
        throw new Error('Network error. Please try again.');
      } else {
        throw new Error('An unexpected error occurred.');
      }
    }
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      await api.post(`/auth/reset-password/${token}`, { newPassword });
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to reset password.');
      } else if (error.request) {
        throw new Error('Network error. Please try again.');
      } else {
        throw new Error('An unexpected error occurred.');
      }
    }
  },

  async verifyEmail(token: string): Promise<void> {
    try {
      await api.get(`/auth/verify-email/${token}`);
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Email verification failed.');
      } else if (error.request) {
        throw new Error('Network error. Please try again.');
      } else {
        throw new Error('An unexpected error occurred.');
      }
    }
  },

  async resendVerificationEmail(email: string): Promise<void> {
    try {
      await api.post('/auth/resend-verification', { email });
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to resend verification email.');
      } else if (error.request) {
        throw new Error('Network error. Please try again.');
      } else {
        throw new Error('An unexpected error occurred.');
      }
    }
  },
};