import React, { useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import { soundService } from '../services/soundService';

export const AdminPage: React.FC = () => {
  const [subTab, setSubTab] = useState<'users' | 'exercises' | 'nutrition'>('users');

  const exportCSV = () => {
    soundService.playSuccess();
    const csvContent =
      'data:text/csv;charset=utf-8,ID,Name,Role,Status,XP\nusr_01a,Priya Sharma,Premium Subscriber,Active,1450\nusr_02b,Vikramaditya S.,Premium Subscriber,Active,18500';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'apex_ai_enterprise_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const addRecord = () => {
    soundService.playClick();
    const name = prompt(
      'Enter New Enterprise Record Name (User, Exercise, or Food item):',
      'New Custom Exercise Protocol'
    );
    if (name) {
      alert(`Record "${name}" added to PostgreSQL/SQLite Database Queue!`);
      soundService.playSuccess();
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 border-purple-500/40 bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-blue-900/10 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-glow-blue">
        <div>
          <div className="flex items-center space-x-2 text-xs font-extrabold text-purple-400 uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4 text-purple-400" />
            <span>Enterprise Admin Portal</span>
          </div>
          <h2 className="text-2xl font-extrabold">Apex AI Pro Admin Dashboard</h2>
          <p className="text-xs text-gray-300 mt-1 font-medium">
            Manage Users, 3D Exercises, Nutrition DB, Subscriptions, and Reports.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => alert('Exported complete JSON dump!')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-extrabold text-white border border-white/15"
          >
            Export JSON
          </button>
          <button
            onClick={exportCSV}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-extrabold text-white shadow-lg"
          >
            Export CSV Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-5">
          <div className="text-xs text-gray-400 font-bold uppercase">Active Users</div>
          <div className="text-3xl font-extrabold text-white mt-1">14,280</div>
          <div className="text-[11px] text-emerald-400 font-bold mt-1">+18% this month</div>
        </div>
        <div className="glass-card p-5">
          <div className="text-xs text-gray-400 font-bold uppercase">3D Exercise Library</div>
          <div className="text-3xl font-extrabold text-blue-400 mt-1">32 Exercises</div>
          <div className="text-[11px] text-cyan-400 font-bold mt-1">100% HD Anatomical</div>
        </div>
        <div className="glass-card p-5">
          <div className="text-xs text-gray-400 font-bold uppercase">Indian Food Items</div>
          <div className="text-3xl font-extrabold text-emerald-400 mt-1">42 Verified</div>
          <div className="text-[11px] text-gray-400 font-bold mt-1">Thali, Dosa, Millets</div>
        </div>
        <div className="glass-card p-5">
          <div className="text-xs text-gray-400 font-bold uppercase">Server Uptime</div>
          <div className="text-3xl font-extrabold text-purple-400 mt-1">99.98%</div>
          <div className="text-[11px] text-emerald-400 font-bold mt-1">AWS S3 / CloudFront</div>
        </div>
      </div>

      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => {
                soundService.playClick();
                setSubTab('users');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold shadow ${
                subTab === 'users' ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-300'
              }`}
            >
              Users (14k)
            </button>
            <button
              onClick={() => {
                soundService.playClick();
                setSubTab('exercises');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold shadow ${
                subTab === 'exercises' ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-300'
              }`}
            >
              Exercises (32)
            </button>
            <button
              onClick={() => {
                soundService.playClick();
                setSubTab('nutrition');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold shadow ${
                subTab === 'nutrition' ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-300'
              }`}
            >
              Nutrition DB (42)
            </button>
          </div>
          <button
            onClick={addRecord}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-extrabold shadow"
          >
            + Add Record
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 text-gray-400 font-bold uppercase border-b border-white/10">
              <tr>
                <th className="p-3.5">ID / Slug</th>
                <th className="p-3.5">Name</th>
                <th className="p-3.5">Category / Role</th>
                <th className="p-3.5">Status / Metrics</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-medium">
              {subTab === 'users' && (
                <>
                  <tr>
                    <td className="p-3.5 font-mono">usr_01a</td>
                    <td className="p-3.5 font-bold">Priya Sharma (Active)</td>
                    <td className="p-3.5">Premium Subscriber</td>
                    <td className="p-3.5 text-emerald-400 font-bold">92% Recovery • Lvl 6</td>
                    <td className="p-3.5 text-right">
                      <button className="text-blue-400 font-bold hover:underline">Edit</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-mono">usr_02b</td>
                    <td className="p-3.5 font-bold">Vikramaditya S.</td>
                    <td className="p-3.5">Premium Subscriber</td>
                    <td className="p-3.5 text-emerald-400 font-bold">89% Recovery • Lvl 14</td>
                    <td className="p-3.5 text-right">
                      <button className="text-blue-400 font-bold hover:underline">Edit</button>
                    </td>
                  </tr>
                </>
              )}
              {subTab === 'exercises' && (
                <>
                  <tr>
                    <td className="p-3.5 font-mono">barbell-back-squat</td>
                    <td className="p-3.5 font-bold">Barbell Back Squat</td>
                    <td className="p-3.5">Legs (Quadriceps)</td>
                    <td className="p-3.5 text-cyan-400 font-bold">HD 3D Model Verified</td>
                    <td className="p-3.5 text-right">
                      <button className="text-blue-400 font-bold hover:underline">Edit</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-mono">barbell-bench-press</td>
                    <td className="p-3.5 font-bold">Flat Barbell Bench Press</td>
                    <td className="p-3.5">Chest (Pectoralis Major)</td>
                    <td className="p-3.5 text-cyan-400 font-bold">HD 3D Model Verified</td>
                    <td className="p-3.5 text-right">
                      <button className="text-blue-400 font-bold hover:underline">Edit</button>
                    </td>
                  </tr>
                </>
              )}
              {subTab === 'nutrition' && (
                <>
                  <tr>
                    <td className="p-3.5 font-mono">food_idli</td>
                    <td className="p-3.5 font-bold">Idli (2 Medium) + Sambar</td>
                    <td className="p-3.5">Breakfast</td>
                    <td className="p-3.5 text-orange-400 font-bold">226 kcal • 9.6g protein</td>
                    <td className="p-3.5 text-right">
                      <button className="text-blue-400 font-bold hover:underline">Edit</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-mono">food_dosa</td>
                    <td className="p-3.5 font-bold">Masala Dosa with Sambar</td>
                    <td className="p-3.5">Breakfast</td>
                    <td className="p-3.5 text-orange-400 font-bold">385 kcal • 8.5g protein</td>
                    <td className="p-3.5 text-right">
                      <button className="text-blue-400 font-bold hover:underline">Edit</button>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
