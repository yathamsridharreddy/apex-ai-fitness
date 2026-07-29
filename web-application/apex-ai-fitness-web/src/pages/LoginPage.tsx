// APEX AI FITNESS — PRO (Apple-Grade Authentication & Account Creation Screen)
// Users sign in or register to access their own personalized fitness telemetry (no static predefined data).

import React, { useState } from 'react';
import { useFitnessStore } from '../store/useFitnessStore';
import { soundService } from '../services/soundService';
import { Zap, LogIn, UserPlus, ShieldCheck, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, signup, loginAsGuest } = useFitnessStore();

  const [authMode, setAuthMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [weightKg, setWeightKg] = useState<number>(72);
  const [heightCm, setHeightCm] = useState<number>(178);
  const [age, setAge] = useState<number>(27);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter a valid email address.');
      return;
    }
    if (authMode === 'LOGIN') {
      login(email, fullName);
    } else {
      signup(email, fullName, Number(weightKg), Number(heightCm), Number(age));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden bg-[#07090E]">
      {/* Ambient Spotlight Backgrounds */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Main Glassmorphic Auth Card */}
      <div className="glass-card max-w-md w-full p-8 sm:p-10 space-y-8 relative z-10 border-blue-500/40 shadow-glow-blue">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">APEX AI PRO</h1>
          <p className="text-xs text-gray-400">
            Sign in to load your personal AI workout & nutrition telemetry.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center bg-white/5 p-1 rounded-2xl border border-white/10">
          <button
            type="button"
            onClick={() => {
              soundService.playClick();
              setAuthMode('LOGIN');
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
              authMode === 'LOGIN'
                ? 'bg-blue-600 text-white shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => {
              soundService.playClick();
              setAuthMode('SIGNUP');
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
              authMode === 'SIGNUP'
                ? 'bg-blue-600 text-white shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create Account</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
          {authMode === 'SIGNUP' && (
            <div>
              <label className="block text-gray-300 font-bold mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Sridhar Reddy"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white font-semibold placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-300 font-bold mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="e.g. you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white font-semibold placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-bold mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white font-semibold placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {authMode === 'SIGNUP' && (
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-white/10">
              <div>
                <label className="block text-gray-400 font-semibold mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-semibold"
                />
              </div>
              <div>
                <label className="block text-gray-400 font-semibold mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-semibold"
                />
              </div>
              <div>
                <label className="block text-gray-400 font-semibold mb-1">Age (Years)</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white font-semibold"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-blue-500/30 transition flex items-center justify-center space-x-2 mt-2"
          >
            <span>{authMode === 'LOGIN' ? 'Sign In to Dashboard' : 'Create Account & Plan'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink mx-3 text-gray-500 text-[11px] uppercase tracking-wider font-bold">
            Or continue with
          </span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        {/* Instant Demo / Guest Button */}
        <button
          type="button"
          onClick={loginAsGuest}
          className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-extrabold text-cyan-400 border border-white/15 transition flex items-center justify-center space-x-2"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>⚡ Continue as Guest / Try Demo Account</span>
        </button>
      </div>

      <p className="text-center text-gray-500 text-xs mt-6 max-w-md">
        Apex AI Pro uses end-to-end encrypted local storage & PostgreSQL telemetry. Your personal data is never shared.
      </p>
    </div>
  );
};
