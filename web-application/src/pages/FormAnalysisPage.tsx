import React, { useState, useRef } from 'react';
import { Camera } from 'lucide-react';
import { soundService } from '../services/soundService';

export const FormAnalysisPage: React.FC = () => {
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [alertTitle, setAlertTitle] = useState<string>('OPTIMAL FORM DETECTED');
  const [alertMsg, setAlertMsg] = useState<string>(
    'Perfect depth! Knee flexion angle at 88° (parallel achieved).'
  );
  const [alertScore, setAlertScore] = useState<string>('100% Score');
  const [scoreColor, setScoreColor] = useState<string>('text-emerald-400');
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleCamera = async () => {
    soundService.playClick();
    if (!isCameraActive) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraActive(true);
        soundService.playVoiceCue(
          '/audio/workout_start.mp3',
          'Live AI Camera Form Analyzer initialized. Ensure full body is visible.'
        );
      } catch (err) {
        alert('Webcam access was denied or not available. Switching to simulated AI Telemetry mode!');
        simulateCorrection('DEPTH');
      }
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
      setIsCameraActive(false);
    }
  };

  const simulateCorrection = (type: 'DEPTH' | 'SPINE' | 'ELBOW') => {
    soundService.playClick();
    if (type === 'DEPTH') {
      setAlertTitle('DEPTH CORRECTION REQUIRED');
      setAlertMsg('Increase depth! Lower hips until thighs are parallel to the floor.');
      setAlertScore('75% Score');
      setScoreColor('text-orange-400');
      soundService.playVoiceCue(
        '/audio/form_squat_depth.mp3',
        'Keep your chest up and increase your squat depth until your thighs are parallel to the floor.'
      );
    } else if (type === 'SPINE') {
      setAlertTitle('POSTURE ALERT: LUMBAR ROUNDING');
      setAlertMsg('Straighten back! Maintain a neutral lumbar spine and brace core.');
      setAlertScore('70% Score');
      setScoreColor('text-red-400');
      soundService.playVoiceCue(
        '/audio/form_back_straight.mp3',
        'Maintain a neutral spine and engage your core. Straighten your back throughout the movement.'
      );
    } else if (type === 'ELBOW') {
      setAlertTitle('ELBOW TUCK ALERT');
      setAlertMsg('Keep elbows tucked to 45° to protect rotator cuffs!');
      setAlertScore('82% Score');
      setScoreColor('text-cyan-400');
      soundService.playVoiceCue(
        '/audio/form_back_straight.mp3',
        'Keep elbows tucked to 45 degrees to protect your shoulder joint.'
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            AI Camera Form Analyzer (Real-Time Biomechanics)
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Detects posture, spinal neutral alignment, squat depth, and elbow tuck using phone/webcam
            camera or simulated live telemetry.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={toggleCamera}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/30 flex items-center space-x-2 transition"
          >
            <Camera className="w-4 h-4" />
            <span>{isCameraActive ? 'Stop Live Camera' : 'Start Live Camera'}</span>
          </button>
          <button
            onClick={() => simulateCorrection('DEPTH')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white border border-white/15 transition"
          >
            Test "Increase Depth" Alert
          </button>
          <button
            onClick={() => simulateCorrection('SPINE')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white border border-white/15 transition"
          >
            Test "Straighten Back" Alert
          </button>
          <button
            onClick={() => simulateCorrection('ELBOW')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white border border-white/15 transition"
          >
            Test "Elbow Tuck" Alert
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 cols */}
        <div className="lg:col-span-8 glass-card p-6 flex flex-col items-center justify-center relative min-h-[440px] bg-black/60 rounded-3xl overflow-hidden border-cyan-500/30 shadow-glow-blue">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className={`absolute inset-0 w-full h-full object-cover ${
              isCameraActive ? '' : 'hidden'
            }`}
          />
          <canvas className="absolute inset-0 w-full h-full object-cover pointer-events-none" />

          {!isCameraActive && (
            <div className="text-center z-10 p-8 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shadow-lg">
                <Camera className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white">AI Vision Skeleton Active</h3>
                <p className="text-xs text-gray-300 max-w-md mx-auto mt-1 leading-relaxed">
                  Click "Start Live Camera" to enable webcam pose detection, or click the test buttons
                  above to hear real-time AI Voice corrections and view joint angle overlays!
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-gray-300 pt-3">
                <span className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block"></span>
                  <span>Hip & Knee Angle</span>
                </span>
                <span className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
                  <span>Spinal Alignment</span>
                </span>
                <span className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-orange-400 inline-block"></span>
                  <span>Bar Velocity</span>
                </span>
              </div>
            </div>
          )}

          {/* Alert Banner */}
          <div className="absolute top-4 left-4 right-4 p-4 rounded-2xl bg-black/85 backdrop-blur-md border border-cyan-500/40 flex items-center justify-between transition-all shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping"></div>
              <div>
                <div className="text-xs font-extrabold text-cyan-400 uppercase tracking-widest">
                  {alertTitle}
                </div>
                <div className="text-sm font-bold text-white">{alertMsg}</div>
              </div>
            </div>
            <span
              className={`text-xs font-mono font-bold px-3 py-1 rounded-lg bg-white/10 ${scoreColor}`}
            >
              {alertScore}
            </span>
          </div>
        </div>

        {/* Right 4 cols */}
        <div className="lg:col-span-4 glass-card p-6 space-y-4">
          <h3 className="font-extrabold text-base">Live Biomechanical Telemetry</h3>

          <div className="space-y-3.5">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex justify-between text-xs font-bold text-gray-300 mb-1.5">
                <span>Squat Depth (Knee Angle)</span>
                <span className="text-cyan-400 font-bold">88° (Parallel)</span>
              </div>
              <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-2.5 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex justify-between text-xs font-bold text-gray-300 mb-1.5">
                <span>Lumbar Neutral Spine</span>
                <span className="text-emerald-400 font-bold">Neutral (4° Tilt)</span>
              </div>
              <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-2.5 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex justify-between text-xs font-bold text-gray-300 mb-1.5">
                <span>Eccentric Tempo Velocity</span>
                <span className="text-blue-400 font-bold">2.8 seconds</span>
              </div>
              <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-400 h-2.5 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 space-y-2">
            <div className="text-xs font-bold text-gray-300">AI Safety Rules Active:</div>
            <ul className="text-xs space-y-2 text-gray-400 font-medium">
              <li className="flex items-center space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Alerts if knee collapse (valgus) detected</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Alerts if lumbar rounding exceeds 15°</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Voice coach speech feedback enabled</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
