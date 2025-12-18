import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserData {
  name: string;
  email: string;
  mobile: string;
  role: string;
  department: string;
  employeeId: string;
  avatar?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserData | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Initial state
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,

      // Actions
      login: async (username: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          // Simulate API call delay
          await new Promise(resolve => setTimeout(resolve, 1000));

          // Mock authentication logic
          if (username && password) {
            const mockUser: UserData = {
              name: username || 'John Doe',
              email: `${username.toLowerCase().replace(' ', '.')}@omnix.com`,
              mobile: '+91 98765 43210',
              role: 'Manager',
              department: 'Production',
              employeeId: 'EMP-001',
            };

            set({
              isAuthenticated: true,
              user: mockUser,
              isLoading: false,
              error: null,
            });
          } else {
            throw new Error('Invalid credentials');
          }
        } catch (error) {
          set({
            isAuthenticated: false,
            user: null,
            isLoading: false,
            error: error instanceof Error ? error.message : 'Login failed',
          });
        }
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          isLoading: false,
          error: null,
        });
      },

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      setError: (error: string | null) => set({ error }),

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);
