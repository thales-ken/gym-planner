'use client';

import { validateLogin, createSession, writeSession } from '@/lib/mockData';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate async login
    setTimeout(() => {
      const user = validateLogin(email, password);

      if (user) {
        // Create and store session
        const session = createSession(user);
        writeSession(session);
        // Force a full page reload to ensure session is picked up
        setTimeout(() => {
          window.location.href = '/';
        }, 100);
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-2">
            Gym Planner
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to your account
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 space-y-4"
        >
          {/* Email Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg p-3">
              <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition active:scale-95"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
            Demo Accounts:
          </p>
          <div className="space-y-1 text-xs text-blue-800 dark:text-blue-400">
            <p>
              <strong>Account 1:</strong> alex@example.com / password123
            </p>
            <p>
              <strong>Account 2:</strong> jordan@example.com / password123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
