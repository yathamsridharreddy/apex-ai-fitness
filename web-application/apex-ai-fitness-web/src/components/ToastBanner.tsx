// APEX AI FITNESS — PRO (Apple-Grade In-App Toast Notification Banner)
// Replaces 100% of intrusive browser alert() popups with sleek glassmorphic banners.

import React from 'react';
import { useFitnessStore } from '../store/useFitnessStore';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export const ToastBanner: React.FC = () => {
  const { toast, hideToast } = useFitnessStore();

  if (!toast || !toast.visible) return null;

  const getStyle = () => {
    if (toast.type === 'success') {
      return {
        bg: 'bg-emerald-600/90 border-emerald-400/60 text-white',
        icon: <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
      };
    }
    if (toast.type === 'error') {
      return {
        bg: 'bg-red-600/90 border-red-400/60 text-white',
        icon: <AlertCircle className="w-4 h-4 text-red-200 shrink-0" />
      };
    }
    return {
      bg: 'bg-blue-600/90 border-blue-400/60 text-white',
      icon: <Info className="w-4 h-4 text-blue-200 shrink-0" />
    };
  };

  const style = getStyle();

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full px-4 animate-fadeIn">
      <div
        className={`flex items-center justify-between p-3.5 rounded-2xl backdrop-blur-xl border shadow-2xl ${style.bg}`}
      >
        <div className="flex items-center space-x-2.5 text-xs font-bold">
          {style.icon}
          <span>{toast.message}</span>
        </div>
        <button
          onClick={hideToast}
          className="p-1 rounded-lg hover:bg-white/20 text-white/80 hover:text-white transition"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
