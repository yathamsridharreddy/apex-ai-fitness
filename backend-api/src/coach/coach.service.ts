// APEX AI FITNESS — PRO (24/7 AI Fitness & Nutrition Coach Service)
// Intelligent conversational coach with specialized domain knowledge across 10 core health disciplines.

export interface CoachMessage {
  id: string;
  sender: 'USER' | 'AI_COACH';
  text: string;
  category: 'Workout' | 'Diet' | 'Recovery' | 'Supplements' | 'Injuries' | 'Stretching' | 'Sleep' | 'Hydration' | 'Motivation' | 'Progress';
  timestamp: string;
  suggestedActions?: { label: string; action: string }[];
}

export class AiCoachService {
  private readonly KB: Record<string, string> = {
    Workout: "For progressive overload, aim to increase weight by 2.5kg when you hit the top of your rep range for 2 consecutive sessions. Always prioritize full range of motion over load.",
    Diet: "To optimize muscle protein synthesis, consume 2.2g of protein per kg of body weight daily, evenly distributed across 4 to 5 meals (approx 25-40g per meal).",
    Recovery: "Your Recovery Score is calculated from HRV, resting heart rate, sleep efficiency, and muscle strain. If below 70, swap high-intensity lifting for Zone 2 cardio or mobility.",
    Supplements: "Core evidence-based supplements: 1) Creatine Monohydrate (5g daily for ATP saturation), 2) Whey or Plant Protein Isolate, 3) Vitamin D3 + K2, 4) Magnesium Glycinate before sleep.",
    Injuries: "Never lift through sharp joint pain. If you feel lower back irritation during squats, substitute with Bulgarian Split Squats or Leg Press and focus on core bracing.",
    Stretching: "Perform dynamic stretches (leg swings, arm circles) before your workout to lubricate joints, and static holds (20-30 seconds) post-workout while muscles are warm.",
    Sleep: "Deep REM sleep is when growth hormone is secreted and muscle repair occurs. Target 7.5 to 8.5 hours in an 18°C dark room without screens 60 mins before bed.",
    Hydration: "Dehydration of just 2% body weight reduces muscular strength by up to 15%. Aim for 3.5 to 4.5 liters daily, adding electrolytes during heavy sweating.",
    Motivation: "Discipline outperforms motivation. You've completed 14 workouts this month—you're in the top 5% of consistent athletes on Apex AI. Let's conquer today's protocol!",
    Progress: "Your estimated 1RM on Squat has increased by +12.5kg over the last 30 days! Your body fat percentage has trended down -1.4%. Outstanding recomposition."
  };

  /**
   * Generates intelligent, personalized coaching responses
   */
  public generateResponse(userQuery: string, userStats: {
    name: string;
    weightKg: number;
    recoveryScore: number;
    streak: number;
  }): CoachMessage {
    const qLower = userQuery.toLowerCase();
    let category: CoachMessage['category'] = 'Workout';
    let text = '';
    let suggestedActions = [];

    if (qLower.includes('diet') || qLower.includes('protein') || qLower.includes('meal') || qLower.includes('eat') || qLower.includes('macro')) {
      category = 'Diet';
      text = `Hi ${userStats.name}, at your current body weight of ${userStats.weightKg}kg, your daily protein target is ${Math.round(userStats.weightKg * 2.2)}g. For Indian diets, combine Paneer Tikka (25g protein), Dal Tadka (12g protein), and 1 scoop of Whey/Plant Protein (24g) to easily hit your targets!`;
      suggestedActions = [
        { label: 'View Indian High-Protein Meal Plan', action: 'OPEN_DIET_PLANNER' },
        { label: 'Log Today\'s Meals', action: 'OPEN_FOOD_SCANNER' }
      ];
    } else if (qLower.includes('recover') || qLower.includes('sore') || qLower.includes('tired') || qLower.includes('rest')) {
      category = 'Recovery';
      text = `Your current Recovery Score is ${userStats.recoveryScore}%. ${userStats.recoveryScore > 80 ? 'You are in optimal condition for high-intensity progressive overload today!' : 'Your nervous system is fatigued. I recommend reducing total workout volume by 25% today or taking an active rest day.'}`;
      suggestedActions = [
        { label: 'Adjust Today\'s Workout Volume', action: 'ADJUST_WORKOUT_VOLUME' },
        { label: 'View Sleep & Recovery Advice', action: 'OPEN_RECOVERY_MODAL' }
      ];
    } else if (qLower.includes('supplement') || qLower.includes('creatine') || qLower.includes('whey') || qLower.includes('vitamin')) {
      category = 'Supplements';
      text = this.KB.Supplements;
      suggestedActions = [
        { label: 'Check Supplement Timing', action: 'VIEW_SUPPLEMENTS' }
      ];
    } else if (qLower.includes('injury') || qLower.includes('pain') || qLower.includes('hurt') || qLower.includes('back') || qLower.includes('shoulder')) {
      category = 'Injuries';
      text = this.KB.Injuries;
      suggestedActions = [
        { label: 'Switch to Low-Back Safe Exercises', action: 'FILTER_SAFE_EXERCISES' }
      ];
    } else if (qLower.includes('stretch') || qLower.includes('flexibility') || qLower.includes('mobility') || qLower.includes('warmup')) {
      category = 'Stretching';
      text = this.KB.Stretching;
      suggestedActions = [
        { label: 'Start 5-Minute Dynamic Warmup', action: 'START_WARMUP' }
      ];
    } else if (qLower.includes('sleep') || qLower.includes('insomnia') || qLower.includes('nap')) {
      category = 'Sleep';
      text = this.KB.Sleep;
    } else if (qLower.includes('water') || qLower.includes('hydrat') || qLower.includes('drink')) {
      category = 'Hydration';
      text = `At ${userStats.weightKg}kg body weight, you should consume ${Number((userStats.weightKg * 0.045).toFixed(1))} Liters of water daily. Don't forget a pinch of pink salt or electrolytes pre-workout!`;
      suggestedActions = [
        { label: '+500ml Water Quick Log', action: 'LOG_WATER_500ML' }
      ];
    } else if (qLower.includes('motivat') || qLower.includes('streak') || qLower.includes('give up')) {
      category = 'Motivation';
      text = `You are on a ${userStats.streak}-day workout streak, ${userStats.name}! Consistency is what separates champions from beginners. Let's finish today's session strong—you'll earn 250 XP!`;
    } else if (qLower.includes('progress') || qLower.includes('1rm') || qLower.includes('weight loss') || qLower.includes('muscle gain')) {
      category = 'Progress';
      text = this.KB.Progress;
      suggestedActions = [
        { label: 'Open Interactive Progress Charts', action: 'OPEN_ANALYTICS' }
      ];
    } else {
      category = 'Workout';
      text = `${this.KB.Workout} What specific exercise or muscle group would you like technical guidance on today?`;
      suggestedActions = [
        { label: 'View 3D Exercise Library', action: 'OPEN_EXERCISE_LIBRARY' },
        { label: 'Start Today\'s Workout', action: 'START_WORKOUT' }
      ];
    }

    return {
      id: `msg-${Date.now()}`,
      sender: 'AI_COACH',
      text,
      category,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions
    };
  }
}
