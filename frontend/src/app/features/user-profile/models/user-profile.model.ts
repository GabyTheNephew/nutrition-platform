export type Gender = 'MALE' | 'FEMALE';

export type ActivityLevel = 
  | 'SEDENTARY' 
  | 'LIGHTLY_ACTIVE' 
  | 'MODERATELY_ACTIVE' 
  | 'VERY_ACTIVE';

export type FitnessGoal = 
  | 'LOSE_WEIGHT' 
  | 'BODY_RECOMPOSITION' 
  | 'GAIN_MUSCLE' 
  | 'MAINTAIN_WEIGHT';

export type GoalPace = 
  | 'CONSERVATIVE' 
  | 'MODERATE' 
  | 'AGGRESSIVE';

export type BmiCategory = 
  | 'UNDERWEIGHT' 
  | 'NORMAL' 
  | 'OVERWEIGHT' 
  | 'OBESE';

export type HealthCondition = 
  | 'NONE'
  | 'AUTOIMMUNE_HYPERTHYROIDISM'
  | 'HYPOTHYROIDISM_HASHIMOTO'
  | 'DIABETES_TYPE_2'
  | 'HYPERTENSION'
  | 'GOUT'
  | 'IBS'
  | 'GERD';

export type DietaryRestriction = 
  | 'NONE'
  | 'GLUTEN_FREE'
  | 'LACTOSE_FREE'
  | 'NUT_FREE'
  | 'EGG_FREE'
  | 'SEAFOOD_FREE'
  | 'VEGETARIAN'
  | 'VEGAN';

export interface UserProfileCreate {
  userId?: string;
  displayName: string;
  gender: Gender;
  age: number;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  goal: FitnessGoal;
  goalPace: GoalPace;
  healthConditions: HealthCondition[];
  dietaryRestrictions: DietaryRestriction[];
}

export interface UserProfile {
  id: string;
  userId: string;
  displayName: string;
  gender: Gender;
  age: number;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  goal: FitnessGoal;
  goalPace: GoalPace;
  healthConditions: HealthCondition[];
  dietaryRestrictions: DietaryRestriction[];
  bmi: number;
  bmiCategory: BmiCategory;
  bmr: number;
  tdee: number;
  targetCalories: number;
  targetProteinGrams: number;
  targetCarbsGrams: number;
  targetFatGrams: number;
  updatedAt: string;
}