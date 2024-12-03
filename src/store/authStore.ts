import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole } from '../types/user';
import { userService } from '../services/userService';
import toast from 'react-hot-toast';

interface AuthState {
  user: User | null;
  login: (employeeId?: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: async (employeeId?: string) => {
        try {
          if (!employeeId) {
            // Client login
            const clientUser: User = {
              id: crypto.randomUUID(),
              role: 'client',
              active: true,
              createdAt: new Date().toISOString(),
              lastLogin: new Date().toISOString(),
            };
            set({ user: clientUser });
            return;
          }

          // Employee/Admin login
          const users = await userService.getAll();
          const user = users.find(u => u.employeeId === employeeId);

          if (!user) {
            toast.error('Usuario no encontrado');
            return;
          }

          if (!user.active) {
            toast.error('Usuario inactivo');
            return;
          }

          // Update last login
          const updatedUser = {
            ...user,
            lastLogin: new Date().toISOString(),
          };
          await userService.update(updatedUser);
          set({ user: updatedUser });
          toast.success(`Bienvenido ${user.name || user.role}`);
        } catch (error) {
          console.error('Error during login:', error);
          toast.error('Error al iniciar sesión');
        }
      },
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);