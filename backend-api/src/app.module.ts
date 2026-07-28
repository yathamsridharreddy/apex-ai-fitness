// APEX AI FITNESS — PRO (NestJS Production Main Application Module)

import { Module } from '@nestjs/common';
import { AiWorkoutEngineService } from './workout/workout-engine.service';
import { AiNutritionService } from './nutrition/nutrition.service';
import { AiFormAnalysisService } from './form-analysis/form-analysis.service';
import { AiCoachService } from './coach/coach.service';
import { GamificationService } from './gamification/gamification.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    AiWorkoutEngineService,
    AiNutritionService,
    AiFormAnalysisService,
    AiCoachService,
    GamificationService
  ],
  exports: [
    AiWorkoutEngineService,
    AiNutritionService,
    AiFormAnalysisService,
    AiCoachService,
    GamificationService
  ]
})
export class AppModule {}
