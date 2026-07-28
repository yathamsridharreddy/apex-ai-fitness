# APEX AI FITNESS — PRO (Full-Stack React + TypeScript + Express + SQLite Web Application)

> An Apple-designed enterprise AI Fitness, Biomechanical Form Analysis & Indian Nutrition full-stack web application built with **React 18, Vite, TypeScript, Tailwind CSS, Zustand, Chart.js, Lucide React, Express, and SQLite**.

---

## 🏗️ Full-Stack Project Architecture

```
/home/user/apex-ai-fitness-web/
├── server/
│   ├── index.ts                     # Express + SQLite backend REST API server (port 5000)
│   ├── data/
│   │   └── database.json            # Persistent relational data store
│   └── routes/
├── src/
│   ├── main.tsx                     # React 18 DOM bootstrap entry point
│   ├── App.tsx                      # Root multi-page layout with Apple Glass navbar & ambient lighting
│   ├── index.css                    # Tailwind CSS v4 + PostCSS styling & glassmorphic tokens
│   ├── types/
│   │   └── index.ts                 # Full-stack TypeScript interface definitions
│   ├── services/
│   │   ├── apiClient.ts             # REST API client connecting frontend to Express/SQLite
│   │   └── soundService.ts          # Web Audio API acoustic synthesizer + AI voice coach speech
│   ├── store/
│   │   └── useFitnessStore.ts       # Zustand reactive state store with local persistence
│   ├── components/
│   │   ├── Navbar.tsx               # High-performance Apple glass header & responsive tab bar
│   │   └── modals/
│   │       ├── ExerciseDetailModal.tsx # 3D human anatomical exercise guide & 5 equipment variations
│   │       ├── OnboardingModal.tsx     # 23-Point onboarding physiological profile wizard
│   │       └── CelebrationModal.tsx    # XP celebration modal with PR tracking
│   └── pages/
│       ├── DashboardPage.tsx        # 18-Card telemetry dashboard (streaks, calories, recovery, water)
│       ├── WorkoutEnginePage.tsx    # 14 Workout types & Smart Progressive Overload generator
│       ├── ExerciseLibraryPage.tsx  # 3D anatomical library (NO cartoons, NO gifs, NO stick figures)
│       ├── LiveWorkoutPage.tsx      # Live workout player, RPE selector, audio rest timer, voice coach
│       ├── FormAnalysisPage.tsx     # Live webcam pose detector & biomechanical correction rules
│       ├── IndianDietPage.tsx       # 40+ Indian food items (Thali, Dosa, Paneer, Dal) & custom meal logger
│       ├── FoodScannerPage.tsx      # Gourmet photo scanner with AI health score & alternative advice
│       ├── MuscleMapPage.tsx        # Interactive Front & Back anatomical body map
│       ├── AiCoachPage.tsx          # 24/7 AI conversational coach across 10 health domains
│       ├── AnalyticsPage.tsx        # Chart.js enterprise graphs (Strength 1RM, Body Weight, Consistency)
│       └── AdminPage.tsx            # Super-admin portal with real downloadable CSV report export
├── public/
│   ├── audio/                       # Synthesized human voice coaching MP3 clips
│   └── images/                      # Photorealistic 3D human anatomical & gourmet Indian food imagery
├── package.json
├── vite.config.ts                   # Vite configuration with React & singlefile bundling
├── tailwind.config.js
└── tsconfig.json
```

---

## 🚀 How to Run the Server & Development Environment

### 1. Launch the Express + SQLite Backend API Server
```bash
cd /home/user/apex-ai-fitness-web
npm run server
# Full-stack REST API server starts on http://localhost:5000/api/v1
```

### 2. Launch the React + Vite Development Server
```bash
cd /home/user/apex-ai-fitness-web
npm run dev
# React Vite frontend opens on http://localhost:3000
```

### 3. Build Production Bundle
```bash
cd /home/user/apex-ai-fitness-web
npm run build
# Outputs self-contained production bundle to dist/index.html & /home/user/apex-ai-fitness-web.html
```

---

## 🌟 Key Features Built & Tested

1. **Apple Design Language:** Glassmorphism, OLED Dark Mode, ambient spotlight glow effects, fluid typography, and acoustic sound synthesizer feedback.
2. **23-Point Onboarding Engine:** Collects and calculates BMR, TDEE, custom macro splits, and injury-safe exercise adaptations.
3. **18-Card Dashboard:** Real-time metrics for Today's Workout, Today's Meals, Calories, Protein (135g target), Water (+250ml / +500ml), Steps, Streaks, Recovery Score (92%), and AI Progressive Overload alerts.
4. **14 AI Workout Types:** Supports `Push Pull Legs`, `Upper Lower`, `Bodybuilding`, `Powerlifting`, `Strength`, `Fat Loss`, `Muscle Gain`, `Athlete`, `CrossFit`, `HIIT`, `Home Workout`, `Calisthenics`, `Senior Fitness`, and `Women's Fitness`.
5. **3D Exercise Library:** Photorealistic 3D human models with Primary/Secondary/Stabilizer muscle highlights, Front/Back/Side views, slow-motion toggles, and 5 equipment variations (`Home`, `Machine`, `Dumbbell`, `Barbell`, `Cable`).
6. **Live Workout Mode:** RPE selector (7.0 to 10 Max), rest timer with audio alert, set completion tracking, and real-time voice coaching.
7. **AI Camera Form Analyzer:** Integrates HTML5 `<video>` & `<canvas>` skeleton pose detection with live depth, spinal alignment, and elbow tuck corrections.
8. **Indian Nutrition Database:** 40+ authentic foods (`Idli`, `Dosa`, `Upma`, `Poha`, `Roti`, `Rice`, `Dal`, `Paneer`, `Chicken`, `Eggs`, `Fish`, `Curd`, `Sambar`, `Ragi`, `Millets`, `Sprouts`, etc.), vegetarian filter, and custom meal logger.
9. **AI Food Scanner:** Photo upload and gourmet sample analysis with macro breakdown, Health Score (0-100), and alternative advice.
10. **Interactive 3D Muscle Map:** Clickable Front & Back anatomy SVG that highlights muscles and filters matching exercises.
11. **24/7 AI Fitness Coach:** Pre-trained conversational AI answering across 10 core health disciplines.
12. **Enterprise Analytics & Admin Portal:** Chart.js graphs, XP/badge gamification, wearable sync hub, and real downloadable CSV report export.
