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
  MALE: 'Bărbat',
  FEMALE: 'Femeie'
};

export const ACTIVITY_LEVEL_LABELS: Record<ActivityLevel, { title: string; desc: string }> = {
  SEDENTARY: { 
    title: 'Sedentar', 
    desc: 'Muncă de birou, sub 4.000 pași/zi, fără antrenamente regulate' 
  },
  LIGHTLY_ACTIVE: { 
    title: 'Ușor Activ (Recomandat)', 
    desc: 'Muncă de birou + 3-5 zile de sală/sport SAU 6.000-8.000 pași/zi' 
  },
  MODERATELY_ACTIVE: { 
    title: 'Moderat Activ', 
    desc: 'Peste 10.000 pași/zi ȘI 3-5 antrenamente intense/săptămână' 
  },
  VERY_ACTIVE: { 
    title: 'Foarte Activ', 
    desc: 'Muncă fizică grea zilnică (construcții) sau sportiv de performanță' 
  }
};

export const FITNESS_GOAL_LABELS: Record<FitnessGoal, { title: string; desc: string }> = {
  LOSE_WEIGHT: { title: 'Slăbire / Definire', desc: 'Deficit caloric controlat cu protecție musculară' },
  BODY_RECOMPOSITION: { title: 'Recompoziție Corporală', desc: 'Pierdere de grăsime și tonifiere la menținere' },
  GAIN_MUSCLE: { title: 'Masă Musculară', desc: 'Surplus caloric curat pentru hipertrofie' },
  MAINTAIN_WEIGHT: { title: 'Menținere & Sănătate', desc: 'Echilibru energetic optim la nivel de TDEE' }
};

export const GOAL_PACE_LABELS: Record<GoalPace, { title: string; badge: string }> = {
  CONSERVATIVE: { title: 'Relaxat / Conservator', badge: 'Ritm lent, sustenabil' },
  MODERATE: { title: 'Echilibrat (Recomandat)', badge: 'Standardul optim' },
  AGGRESSIVE: { title: 'Alert / Accelerat', badge: 'Progres rapid' }
};

export const BMI_CATEGORY_LABELS: Record<BmiCategory, { label: string; colorClass: string }> = {
  UNDERWEIGHT: { label: 'Subponderal', colorClass: 'badge-blue' },
  NORMAL: { label: 'Greutate Normală', colorClass: 'badge-green' },
  OVERWEIGHT: { label: 'Supraponderal', colorClass: 'badge-orange' },
  OBESE: { label: 'Obezitate', colorClass: 'badge-red' }
};

export const HEALTH_CONDITION_LABELS: Record<HealthCondition, { title: string; icon: string }> = {
  NONE: { title: 'Nu am afecțiuni raportate', icon: 'shield-check' },
  AUTOIMMUNE_HYPERTHYROIDISM: { title: 'Hipertiroidism Autoimun (Basedow)', icon: 'activity' },
  HYPOTHYROIDISM_HASHIMOTO: { title: 'Hipotiroidism / Tiroidită Hashimoto', icon: 'heart-pulse' },
  DIABETES_TYPE_2: { title: 'Diabet Tip 2 / Rezistență la Insulină', icon: 'droplet' },
  HYPERTENSION: { title: 'Hipertensiune Arterială', icon: 'gauge' },
  GOUT: { title: 'Gută / Acid Uric Ridicat', icon: 'alert-triangle' },
  IBS: { title: 'Sindrom de Colon Iritabil (IBS)', icon: 'refresh-cw' },
  GERD: { title: 'Reflux Gastroesofagian (GERD)', icon: 'flame' }
};

export const DIETARY_RESTRICTION_LABELS: Record<DietaryRestriction, { title: string; icon: string }> = {
  NONE: { title: 'Fără restricții alimentare', icon: 'check-circle' },
  GLUTEN_FREE: { title: 'Fără Gluten (Celiachie / Intoleranță)', icon: 'slash' },
  LACTOSE_FREE: { title: 'Fără Lactoză', icon: 'coffee' },
  NUT_FREE: { title: 'Fără Nuci / Alune (Alergii)', icon: 'shield-alert' },
  EGG_FREE: { title: 'Fără Ouă', icon: 'egg' },
  SEAFOOD_FREE: { title: 'Fără Pește / Fructe de mare', icon: 'anchor' },
  VEGETARIAN: { title: 'Vegetarian', icon: 'leaf' },
  VEGAN: { title: 'Vegan (Strict vegetal)', icon: 'sprout' }
};