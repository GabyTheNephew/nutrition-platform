import {
  ActivityLevel,
  BmiCategory,
  DietaryRestriction,
  FitnessGoal,
  Gender,
  GoalPace,
  HealthCondition
} from './user-profile.model';

export const GENDER_LABELS: Record<Gender, string> = {
  MALE: 'Male',
  FEMALE: 'Female'
};

export const ACTIVITY_LEVEL_LABELS: Record<ActivityLevel, { title: string; desc: string }> = {
  SEDENTARY: { title: 'Sedentary', desc: 'Desk job, minimal physical activity' },
  LIGHTLY_ACTIVE: { title: 'Lightly Active', desc: 'Brisk walking / light exercise 1–3 days/week' },
  MODERATELY_ACTIVE: { title: 'Moderately Active', desc: 'Regular workouts 3–5 days/week' },
  VERY_ACTIVE: { title: 'Very Active', desc: 'Hard physical job or intense training 6–7 days/week' }
};

export const FITNESS_GOAL_LABELS: Record<FitnessGoal, { title: string; desc: string }> = {
  LOSE_WEIGHT: { title: 'Lose Weight / Cut', desc: 'Controlled calorie deficit with muscle preservation' },
  BODY_RECOMPOSITION: { title: 'Body Recomposition', desc: 'Lose fat and tone up at maintenance calories' },
  GAIN_MUSCLE: { title: 'Build Muscle', desc: 'Clean calorie surplus for hypertrophy' },
  MAINTAIN_WEIGHT: { title: 'Maintain & Health', desc: 'Optimal energy balance at TDEE level' }
};

export const GOAL_PACE_LABELS: Record<GoalPace, { title: string; badge: string }> = {
  CONSERVATIVE: { title: 'Relaxed / Conservative', badge: 'Slow, sustainable pace' },
  MODERATE: { title: 'Balanced (Recommended)', badge: 'Optimal standard' },
  AGGRESSIVE: { title: 'Fast / Accelerated', badge: 'Rapid progress' }
};

export const BMI_CATEGORY_LABELS: Record<BmiCategory, { label: string; colorClass: string }> = {
  UNDERWEIGHT: { label: 'Underweight', colorClass: 'badge-blue' },
  NORMAL: { label: 'Normal Weight', colorClass: 'badge-green' },
  OVERWEIGHT: { label: 'Overweight', colorClass: 'badge-orange' },
  OBESE: { label: 'Obese', colorClass: 'badge-red' }
};

export const HEALTH_CONDITION_LABELS: Record<HealthCondition, { title: string; icon: string }> = {
  NONE: { title: 'No reported conditions', icon: 'shield-check' },
  AUTOIMMUNE_HYPERTHYROIDISM: { title: 'Autoimmune Hyperthyroidism (Graves)', icon: 'activity' },
  HYPOTHYROIDISM_HASHIMOTO: { title: 'Hypothyroidism / Hashimoto’s Thyroiditis', icon: 'heart-pulse' },
  DIABETES_TYPE_2: { title: 'Type 2 Diabetes / Insulin Resistance', icon: 'droplet' },
  HYPERTENSION: { title: 'Hypertension (High Blood Pressure)', icon: 'gauge' },
  GOUT: { title: 'Gout / High Uric Acid', icon: 'alert-triangle' },
  IBS: { title: 'Irritable Bowel Syndrome (IBS)', icon: 'refresh-cw' },
  GERD: { title: 'Gastroesophageal Reflux Disease (GERD)', icon: 'flame' }
};

export const DIETARY_RESTRICTION_LABELS: Record<DietaryRestriction, { title: string; icon: string }> = {
  NONE: { title: 'No dietary restrictions', icon: 'check-circle' },
  GLUTEN_FREE: { title: 'Gluten-Free (Celiac / Intolerance)', icon: 'slash' },
  LACTOSE_FREE: { title: 'Lactose-Free', icon: 'coffee' },
  NUT_FREE: { title: 'Nut / Peanut-Free (Allergies)', icon: 'shield-alert' },
  EGG_FREE: { title: 'Egg-Free', icon: 'egg' },
  SEAFOOD_FREE: { title: 'Fish / Seafood-Free', icon: 'anchor' },
  VEGETARIAN: { title: 'Vegetarian', icon: 'leaf' },
  VEGAN: { title: 'Vegan (Strictly plant-based)', icon: 'sprout' }
};