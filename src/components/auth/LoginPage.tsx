import React, { useState } from 'react';
import { LogIn, User, UserCheck } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

export const LoginPage: React.FC = () => {
  const [employeeId, setEmployeeId] = useState('');
  const login = useAuthStore((state) => state.login);

  const handleEmployeeLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(employeeId);
  };

  const handleClientLogin = async () => {
    await login();
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">CLIMAX</h1>
          <p className="text-gray-400">Sistema de Gestión de Bar</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6 space-y-6">
          <div className="space-y-4">
            <form onSubmit={handleEmployeeLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID de Empleado
                </label>
                <input
                  type="password"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ingrese su ID de empleado"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <UserCheck size={20} />
                <span>Ingresar como Empleado</span>
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">O</span>
              </div>
            </div>

            <button
              onClick={handleClientLogin}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"
            >
              <User size={20} />
              <span>Ingresar como Cliente</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};