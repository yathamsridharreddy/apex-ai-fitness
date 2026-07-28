import React, { useState } from 'react';
import { useFitnessStore } from '../store/useFitnessStore';
import { soundService } from '../services/soundService';
import { Bot, Send } from 'lucide-react';

interface CoachMsg {
  sender: 'user' | 'bot';
  text: string;
}

export const AiCoachPage: React.FC = () => {
  const { profile } = useFitnessStore();
  const [messages, setMessages] = useState<CoachMsg[]>([
    {
      sender: 'bot',
      text: `Welcome back, ${profile.name}! You're on a 7-day workout streak and your recovery score is 92%. How can I assist with your training protocol, Indian nutrition targets, or biomechanics today?`
    }
  ]);
  const [input, setInput] = useState('');

  const sendPrompt = (txt: string) => {
    soundService.playSuccess();
    const userMsg: CoachMsg = { sender: 'user', text: txt };
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      let reply =
        'I recommend maintaining your progressive overload target (+2.5kg) while consuming 2.2g of protein per kg of bodyweight daily. Prioritize 7.5 hours of REM sleep tonight!';
      const qLower = txt.toLowerCase();
      if (
        qLower.includes('diet') ||
        qLower.includes('protein') ||
        qLower.includes('indian') ||
        qLower.includes('meal')
      ) {
        reply =
          'For your Indian high-protein plan, combine Paneer Tikka (25g protein), Dal Tadka (12g protein), and 1 bowl of Sprouted Moong Salad (11g protein) to reach your 135g target easily!';
      } else if (
        qLower.includes('recover') ||
        qLower.includes('sore') ||
        qLower.includes('rest')
      ) {
        reply =
          'Your Recovery Score is currently 92% (Peak Readiness). Your nervous system is primed for high-intensity lifting today. Add +2.5kg to your squats!';
      } else if (
        qLower.includes('injur') ||
        qLower.includes('back') ||
        qLower.includes('pain')
      ) {
        reply =
          'If you feel any lower back sensitivity during conventional squats, switch to Bulgarian Split Squats or Leg Press Machine to protect your lumbar spine.';
      } else if (
        qLower.includes('supplement') ||
        qLower.includes('creatine') ||
        qLower.includes('whey')
      ) {
        reply =
          'The core evidence-based supplements are: 1) Creatine Monohydrate (5g daily), 2) Whey or Plant Protein Isolate post-workout, 3) Vitamin D3 + K2, and 4) Magnesium Glycinate 60 mins before sleep.';
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    }, 500);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sendPrompt(input.trim());
    setInput('');
  };

  return (
    <div className="space-y-6">
      {/* Concise Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            24/7 AI Fitness Coach
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">
            Ask any question about workouts, Indian nutrition, recovery, or injuries.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => sendPrompt('What is the best progressive overload strategy for my squats?')}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition"
          >
            🏋️ Workout
          </button>
          <button
            onClick={() => sendPrompt('Give me a high protein Indian meal plan with 135g protein')}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition"
          >
            🥗 Indian Diet
          </button>
          <button
            onClick={() => sendPrompt('My recovery score is 92%. Should I lift heavy today?')}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition"
          >
            ⚡ Recovery
          </button>
          <button
            onClick={() => sendPrompt('What are the core evidence-based supplements I should take?')}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition"
          >
            💊 Supplements
          </button>
          <button
            onClick={() => sendPrompt('My lower back feels tight during squats. How should I adapt?')}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition"
          >
            🩹 Injuries
          </button>
        </div>
      </div>

      <div className="glass-card flex flex-col h-[540px]">
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'items-start space-x-3'}`}
            >
              {m.sender === 'bot' && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              <div
                className={`max-w-xl p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white/10 border border-white/10 text-gray-200'
                }`}
              >
                {m.sender === 'bot' && (
                  <div className="text-xs font-extrabold text-cyan-300 uppercase tracking-wider mb-1">
                    APEX AI COACH
                  </div>
                )}
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/10 flex items-center space-x-3 bg-black/30 rounded-b-2xl">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about workouts, Indian food thalis, injuries, supplements, sleep..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-sm font-medium text-white focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSend}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm transition shadow-lg shadow-blue-500/30 flex items-center space-x-1.5"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
