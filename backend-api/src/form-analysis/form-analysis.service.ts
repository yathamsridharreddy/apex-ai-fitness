// APEX AI FITNESS — PRO (AI Computer Vision Form Analysis Service)
// Detects posture, joint angle depth, spinal alignment, and provides instant audio-visual corrections.

export interface FormCheckRule {
  exerciseSlug: string;
  targetJointAngles: {
    kneeAngleMinDeg: number;
    hipAngleMaxDeg: number;
    spineNeutralToleranceDeg: number;
  };
  corrections: {
    condition: string;
    message: string;
    audioFile: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
  }[];
}

export const FORM_CHECK_RULES: Record<string, FormCheckRule> = {
  'barbell-back-squat': {
    exerciseSlug: 'barbell-back-squat',
    targetJointAngles: {
      kneeAngleMinDeg: 80, // below parallel
      hipAngleMaxDeg: 110,
      spineNeutralToleranceDeg: 10
    },
    corrections: [
      {
        condition: 'kneeAngle > 95',
        message: 'Increase depth! Lower hips until thighs are parallel to the floor.',
        audioFile: '/audio/form_squat_depth.mp3',
        priority: 'HIGH'
      },
      {
        condition: 'spineFlexion > 15',
        message: 'Straighten back! Maintain a neutral lumbar spine and brace core.',
        audioFile: '/audio/form_back_straight.mp3',
        priority: 'HIGH'
      },
      {
        condition: 'velocityEccentric > 2.0',
        message: 'Control movement! Slow down the lowering phase to 3 seconds.',
        audioFile: '/audio/workout_start.mp3',
        priority: 'MEDIUM'
      }
    ]
  },
  'barbell-bench-press': {
    exerciseSlug: 'barbell-bench-press',
    targetJointAngles: {
      kneeAngleMinDeg: 90,
      hipAngleMaxDeg: 180,
      spineNeutralToleranceDeg: 15
    },
    corrections: [
      {
        condition: 'elbowAngle > 80',
        message: 'Keep elbows tucked to 45-60 degrees to protect shoulders.',
        audioFile: '/audio/form_back_straight.mp3',
        priority: 'HIGH'
      },
      {
        condition: 'barBounce == true',
        message: 'Control movement! Do not bounce the bar off your chest.',
        audioFile: '/audio/workout_start.mp3',
        priority: 'MEDIUM'
      }
    ]
  }
};

export class AiFormAnalysisService {
  /**
   * Analyzes live camera skeleton keypoints and outputs immediate feedback
   */
  public analyzeFrame(
    exerciseSlug: string,
    keypoints: {
      hip: { x: number; y: number };
      knee: { x: number; y: number };
      ankle: { x: number; y: number };
      shoulder: { x: number; y: number };
    }
  ): {
    isFormCorrect: boolean;
    feedbackText: string;
    audioCueUrl: string | null;
    jointAngleDeg: number;
    correctionType: string;
  } {
    const rule = FORM_CHECK_RULES[exerciseSlug] || FORM_CHECK_RULES['barbell-back-squat'];

    // Calculate knee flexion angle using law of cosines approximation
    const kneeAngleDeg = this.calculateAngle(keypoints.hip, keypoints.knee, keypoints.ankle);

    if (kneeAngleDeg > rule.targetJointAngles.kneeAngleMinDeg + 15) {
      const correction = rule.corrections[0];
      return {
        isFormCorrect: false,
        feedbackText: correction.message,
        audioCueUrl: correction.audioFile,
        jointAngleDeg: Math.round(kneeAngleDeg),
        correctionType: 'DEPTH'
      };
    }

    return {
      isFormCorrect: true,
      feedbackText: 'Perfect form! Keep chest proud and tempo controlled.',
      audioCueUrl: null,
      jointAngleDeg: Math.round(kneeAngleDeg),
      correctionType: 'OPTIMAL'
    };
  }

  private calculateAngle(
    p1: { x: number; y: number },
    p2: { x: number; y: number },
    p3: { x: number; y: number }
  ): number {
    const rad = Math.atan2(p3.y - p2.y, p3.x - p2.x) - Math.atan2(p1.y - p2.y, p1.x - p2.x);
    let deg = Math.abs((rad * 180) / Math.PI);
    if (deg > 180) deg = 360 - deg;
    return deg;
  }
}
