<div align="center">

# ⚡ APEX AI FITNESS — PRO
### Enterprise Apple-Grade AI Fitness, Biomechanical Form Analysis & Indian Nutrition Ecosystem

[![React 18](https://img.shields.io/badge/React-18.2.0-0A84FF?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![NestJS](https://img.shields.io/badge/NestJS-10.3-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![React Native](https://img.shields.io/badge/React_Native_Expo-50.0-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL_Prisma-16.0-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Apple App Store](https://img.shields.io/badge/App_Store-Production_Ready-000000?style=for-the-badge&logo=apple&logoColor=white)](https://developer.apple.com/)
[![Google Play](https://img.shields.io/badge/Google_Play-Production_Ready-3DDC84?style=for-the-badge&logo=googleplay&logoColor=white)](https://play.google.com/)

<p align="center">
  <strong>The world's most advanced AI fitness application, engineered to exceed Fitbod, Nike Training Club, Hevy, Strong, MyFitnessPal, Centr, MuscleWiki, and Freeletics.</strong>
</p>

</div>

---

## 🌟 Executive Summary & Design System

**APEX AI FITNESS — PRO** is a full-stack, enterprise-grade AI fitness and nutrition product built on an Apple-inspired visual hierarchy. Designed with **glassmorphism (`backdrop-blur-24px`)**, **OLED Pure Black Mode**, **fluid 60-FPS animations**, **Web Audio API acoustic haptic feedback**, **in-app Apple Toast Notifications**, and **spoken AI voice coaching**, it delivers an uncompromising, commercial-ready user experience across Web, iOS, Android, and Server architectures.

### 🎨 Key Design & UX Pillars
- **Three Apple Theme Modes:** Instant toggle between **Apple Dark Mode** (`#08090D`), **Apple OLED Pure Black** (`#000000`), and **Apple Light Mode** (`#F5F5F7`).
- **Zero Browser Alert Popups:** 100% of intrusive browser dialogs are replaced by sleek in-app glassmorphic **Apple Toast Notification Banners**.
- **Acoustic Haptic Synthesizer:** Integrated Web Audio API sound synthesizer plays acoustic chords on workout milestones, set completions, and hydration logs.
- **Spoken AI Voice Coach:** Synthesizes human spoken audio cues (`workout_start.mp3`, `form_squat_depth.mp3`, `rest_timer_done.mp3`, `workout_complete.mp3`) with an intelligent fallback to the Web Speech API.

---

## 🏗️ Multi-Package Enterprise Repository Architecture

```
apex-ai-fitness/
├── web-application/                # Full-Stack React 18 + Vite + TypeScript + Tailwind CSS + Express + SQLite
│   ├── server/
│   │   ├── index.ts                # Production REST API server (port 5000)
│   │   ├── data/                   # Persistent relational SQLite/JSON data store
│   │   └── routes/                 # Workouts, Exercises, Nutrition, Coach, and Admin REST controllers
│   ├── src/
│   │   ├── main.tsx                # React 18 DOM bootstrap entry point
│   │   ├── App.tsx                 # Root multi-page layout with Apple Glass navbar & ambient spotlighting
│   │   ├── services/
│   │   │   ├── apiClient.ts        # Full-stack REST API client with LocalStorage synchronization
│   │   │   └── soundService.ts     # Web Audio API acoustic synthesizer + AI voice coach speech
│   │   ├── store/
│   │   │   └── useFitnessStore.ts  # Zustand reactive state store with real-time telemetry
│   │   ├── components/
│   │   │   ├── Navbar.tsx          # High-performance Apple glass header & responsive tab bar
│   │   │   ├── ToastBanner.tsx     # Apple-grade in-app toast notification engine
│   │   │   ├── RealHumanMotionVisualizer.tsx # 60-FPS real human anatomical demonstration & live rep counter
│   │   │   └── modals/             # 3D Exercise Guide, 3-Tab Profile Wizard, and XP Celebration Modal
│   │   └── pages/                  # 11 Clean, Apple-minimal functional application modules
│   └── public/                     # 3D photorealistic human anatomical imagery & synthesized MP3 voice cues
├── backend-api/                    # Production NestJS + TypeScript + PostgreSQL Prisma Enterprise API Server
│   ├── prisma/schema.prisma        # Complete relational schema (Users, Profiles, Workouts, IndianFoods, Wearables)
│   ├── src/                        # NestJS modules: Workout Engine, Indian Nutrition, Form Vision, AI Coach
│   └── package.json
├── mobile-app/                     # React Native / Expo / TypeScript iOS & Android Native Mobile Application
│   ├── src/
│   │   ├── theme/designSystem.ts   # Native Apple Dark/Light/OLED tokens & micro-interactions
│   │   ├── store/fitnessStore.ts   # Zustand offline persistence mobile store
│   │   └── screens/                # Native iOS/Android screens (HomeScreen, LiveWorkoutScreen, etc.)
│   └── package.json
├── standalone-bundles/             # Self-contained single-file HTML/JS interactive production builds
│   ├── apex-ai-fitness-web.html    # Standalone full-stack web application bundle
│   └── apex-ai-fitness-app.html    # Standalone interactive application bundle
└── README.md                       # Comprehensive enterprise documentation
```

---

## ⚡ Complete Feature Matrix — All 11 Modules

### 1. 🏠 Home Dashboard (`DashboardPage.tsx`)
- **18 Live Telemetry Cards:** Monitors Today's Workout, Today's Meals, Calories Remaining, Protein Remaining (`135g target`), Water Intake (`+250ml / +500ml` quick logging), Daily Steps (`8,420`), Workout Streak (`🔥 7 Days`), Recovery Score (`92% Peak Readiness`), and Sleep Score (`88%`).
- **Smart Progressive Overload Alert:** Dynamically evaluates recovery HRV and resting heart rate to recommend load adjustments (`+2.5kg on compound lifts`).
- **100% Zero-Gym Instant Switcher:** Click **"No-Gym Home Workout"** on the Hero Banner to instantly switch your entire training protocol to gym-free calisthenics.

### 2. 📋 AI Workout Engine (`WorkoutEnginePage.tsx`)
- **14 Workout Protocols:** Supports `Push Pull Legs`, `Upper Lower`, `Bodybuilding`, `Powerlifting`, `Strength`, `Fat Loss`, `Muscle Gain`, `Athlete`, `CrossFit`, `HIIT`, `Senior Fitness`, and `Women's Fitness`.
- **100% Zero-Gym Equipment Home Mode:** Dedicated protocol utilizing floor calisthenics and household chairs/doorframes (`Explosive Bodyweight Jump Squat`, `Strict Anatomical Floor Push-Up`, `Chair Bulgarian Split Squat`, `Bodyweight Pike Shoulder Push-Up`, `Doorframe Row`).
- **Smart Progressive Overload Algorithm:** Adapts volume, sets, and working weight recommendations based on previous session performance and nervous system recovery.

### 3. 🏋️ 3D Exercise Library (`ExerciseLibraryPage.tsx`)
- **Zero Cartoons, Zero Gifs, Zero Stick Figures:** Every exercise features a photorealistic 3D human anatomical fitness model.
- **Dynamic 3D Muscle Highlight Overlays:** Glows and highlights Primary, Secondary, and Stabilizer muscles (`Quadriceps`, `Gluteus Maximus`, `Pectoralis Major`, `Latissimus Dorsi`, `Anterior Deltoid`).
- **5 Equipment Variations:** Instantly switch between `Home Version`, `Machine Version`, `Dumbbell Version`, `Barbell Version`, and `Cable Version`.
- **Zero-Gym Filter:** Click **"🏠 Showing Zero-Gym Only"** to filter out all gym equipment exercises.

### 4. 💪 Live Workout Mode (`LiveWorkoutPage.tsx`)
- **60-FPS Real Human Demonstration Engine:** Features `<RealHumanMotionVisualizer />` displaying an articulating human figure performing repetitions with planted ground contacts, bending knees/hips/elbows, and glowing muscle contraction fields.
- **Animated Circular Rep Counter (`REP X OF Y`):** Real-time SVG circular gauge tracking rep progress with speed controls (`1.0X Normal Pace` vs. `0.5X Slow-Mo`).
- **RPE Target Buttons (`7.0`, `8.0`, `9.0`, `10 Max`):** Log your Rate of Perceived Exertion after each set to calibrate next session's load.
- **Audio Rest Timer:** Configurable rest timer (`startRestTimer(60)`) with spoken countdown alerts (`rest_timer_done.mp3`).

### 5. 📷 AI Camera Form Analyzer (`FormAnalysisPage.tsx`)
- **Dual-Source Computer Vision Engine:**
  - **Real Webcam Hardware:** Accesses `navigator.mediaDevices.getUserMedia` for live video pose detection.
  - **High-Definition Live Feed Simulation:** Automatically switches to an interactive studio demo feed if browser sandbox policies restrict webcam hardware, guaranteeing 100% operational availability on all devices.
- **60-FPS Biomechanical Skeleton & Bounding Box Overlay:** Draws real-time cyan/blue tracking brackets, glowing emerald skeleton lines (`#30D158`), and live trigonometric joint angle readouts (`88° Knee Angle`, `105° Hip Hinge`, `75° Elbow`).
- **Spoken Audio Corrections:** Emits spoken voice cues for squat depth (`form_squat_depth.mp3`) and spine posture (`form_back_straight.mp3`).

### 6. 🥗 Indian Diet Planner (`IndianDietPage.tsx`)
- **40+ Regional Indian Food Database:** Authentic nutritional tracking for **Idli, Dosa, Upma, Poha, Roti, Rice, Yellow Dal Tadka, Paneer Tikka, Tandoori Chicken, Boiled Eggs, Fish Curry, Curd, Sambar, Ragi Mudde, Millets, and Sprouted Moong Salad**.
- **2.2g / kg Protein Target Engine:** Automatically calibrates daily protein requirements (`135g`) based on body weight.
- **Custom Meal Creator:** Click **"+ Log Custom Meal"** to log homemade recipes with instant daily macro updates.
- **Vegetarian Toggle:** One-click filter between **🌱 Vegetarian Only** and **All Foods (Veg + Non-Veg)**.

### 7. 📸 AI Food Photo Scanner (`FoodScannerPage.tsx`)
- **AI Vision Macro Detection:** Upload a meal photo or test sample gourmet Indian thali and dosa images.
- **Health Score & Swap Advice:** Calculates Calories, Protein, Carbs, Fat, assigns an **AI Health Score (0-100)**, and provides healthier alternatives (e.g., *"Substitute 1 tbsp oil with olive oil to improve omega-3 ratio"*).

### 8. 🗺️ Interactive 3D Muscle Map (`MuscleMapPage.tsx`)
- **Anatomical Body Map:** Clickable Front and Back anatomy SVG.
- **Instant Exercise Filtering:** Tap any muscle group (**Chest, Back, Shoulders, Biceps, Triceps, Forearms, Core, Glutes, Quads, Hamstrings, Calves, Neck**) to highlight that muscle and open a filtered drawer of matching exercises with 3D guides.

### 9. 🤖 24/7 AI Fitness Coach (`AiCoachPage.tsx`)
- **10 Core Health Disciplines:** Conversational AI trained across `Workout`, `Diet`, `Recovery`, `Supplements`, `Injuries`, `Stretching`, `Sleep`, `Hydration`, `Motivation`, and `Progress`.
- **Instant Prompt Chips:** One-click chips for quick domain-expert responses.

### 10. 📈 Enterprise Analytics, Gamification & Wearables (`AnalyticsPage.tsx`)
- **Chart.js Enterprise Graphs:** Interactive line graphs tracking strength (`Squat 1RM`, `Bench Press 1RM`), body weight, and workout consistency.
- **Gamification & Badges:** XP progress bar, Level progression (`Level 6`), unlocked badges (`🔥 7-Day Streak`, `🏋️‍♂️ 100-Ton Club`, `🥗 Thali Master`, `🎯 Form Perfect`), Weekly Challenges, and an India Leaderboard.
- **Wearables Sync Hub:** Connects and syncs telemetry for **Apple Watch, Wear OS, Garmin, Samsung Galaxy Watch, and Fitbit**.

### 11. 🛡️ Enterprise Super-Admin Portal (`AdminPage.tsx`)
- **System KPI Telemetry:** Monitors Active Users (`14,280`), Exercise Library (`32 Exercises`), Nutrition DB (`42 Verified Foods`), and Server Uptime (`99.98%`).
- **CRUD Table & Real CSV Report Export:** Manage user and exercise records, and click **"Export CSV Report"** to generate and download `apex_ai_enterprise_report.csv` directly to your computer.

---

## 🚀 Step-by-Step Deployment Guide

### 1. Full-Stack Web Application (`web-application/`)
```bash
cd web-application
npm install

# Start Express + SQLite REST API backend server (port 5000)
npm run server

# In a separate terminal, start React 18 + Vite frontend (port 3000)
npm run dev
```

### 2. NestJS Enterprise Backend API (`backend-api/`)
```bash
cd backend-api
npm install

# Synchronize PostgreSQL Prisma schema
npx prisma generate
npx prisma db push

# Start NestJS development server
npm run start:dev
```

### 3. React Native Mobile Application (`mobile-app/`)
```bash
cd mobile-app
npm install

# Launch Expo development server for iOS & Android
npm start

# Build production App Store (iOS IPA) and Google Play (Android AAB) binaries
eas build --platform ios --profile production
eas build --platform android --profile production
```

---

## 📜 License & Author
- **Author:** Sridhar Reddy Yatham (`@yathamsridharreddy`)
- **License:** Proprietary & Confidential / Commercial Enterprise License
- **GitHub Repository:** [https://github.com/yathamsridharreddy/apex-ai-fitness](https://github.com/yathamsridharreddy/apex-ai-fitness)
