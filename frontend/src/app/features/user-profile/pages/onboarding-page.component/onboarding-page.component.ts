import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfileApiService } from '../../services/user-profile-api.service';
import { MedicalDisclaimerComponent } from '../../components/medical-disclaimer.component/medical-disclaimer.component';
import { 
  ActivityLevel, 
  DietaryRestriction, 
  FitnessGoal, 
  Gender, 
  GoalPace, 
  HealthCondition, 
  UserProfile, 
  UserProfileCreate 
} from '../../models/user-profile.model';
import { 
  ACTIVITY_LEVEL_LABELS, 
  BMI_CATEGORY_LABELS, 
  DIETARY_RESTRICTION_LABELS, 
  FITNESS_GOAL_LABELS, 
  GENDER_LABELS, 
  GOAL_PACE_LABELS, 
  HEALTH_CONDITION_LABELS 
} from '../../models/user-profile-labels';

@Component({
  selector: 'app-onboarding-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MedicalDisclaimerComponent],
  templateUrl: './onboarding-page.component.html',
  styleUrl: './onboarding-page.component.scss'
})
export class OnboardingPageComponent implements OnInit {
  private profileApi = inject(UserProfileApiService);
  private router = inject(Router);

  readonly genderLabels = GENDER_LABELS;
  readonly activityLabels = ACTIVITY_LEVEL_LABELS;
  readonly goalLabels = FITNESS_GOAL_LABELS;
  readonly paceLabels = GOAL_PACE_LABELS;
  readonly conditionLabels = HEALTH_CONDITION_LABELS;
  readonly restrictionLabels = DIETARY_RESTRICTION_LABELS;
  readonly bmiLabels = BMI_CATEGORY_LABELS;

  readonly activityKeys: ActivityLevel[] = ['SEDENTARY', 'LIGHTLY_ACTIVE', 'MODERATELY_ACTIVE', 'VERY_ACTIVE'];
  readonly goalKeys: FitnessGoal[] = ['LOSE_WEIGHT', 'BODY_RECOMPOSITION', 'GAIN_MUSCLE', 'MAINTAIN_WEIGHT'];
  readonly paceKeys: GoalPace[] = ['CONSERVATIVE', 'MODERATE', 'AGGRESSIVE'];
  readonly conditionKeys: HealthCondition[] = [
    'NONE',
    'AUTOIMMUNE_HYPERTHYROIDISM',
    'HYPOTHYROIDISM_HASHIMOTO',
    'DIABETES_TYPE_2',
    'HYPERTENSION',
    'GOUT',
    'IBS',
    'GERD'
  ];
  readonly restrictionKeys: DietaryRestriction[] = [
    'NONE',
    'GLUTEN_FREE',
    'LACTOSE_FREE',
    'NUT_FREE',
    'EGG_FREE',
    'SEAFOOD_FREE',
    'VEGETARIAN',
    'VEGAN'
  ];

  // Stare ecran
  currentStep = signal<number>(1);
  isLoading = signal<boolean>(true); // Pornim cu true pentru verificarea profilului
  errorMessage = signal<string>('');
  savedProfile = signal<UserProfile | null>(null);

  // Câmpuri formular
  displayName = '';
  gender: Gender = 'MALE';
  age: number = 22;
  heightCm: number = 182;
  weightKg: number = 73;
  activityLevel: ActivityLevel = 'LIGHTLY_ACTIVE';
  goal: FitnessGoal = 'BODY_RECOMPOSITION';
  goalPace: GoalPace = 'MODERATE';
  selectedConditions = new Set<HealthCondition>(['NONE']);
  selectedRestrictions = new Set<DietaryRestriction>(['NONE']);

  ngOnInit(): void {
    this.checkExistingProfile();
  }

  private checkExistingProfile(): void {
    this.profileApi.getActiveProfile().subscribe({
      next: (profile) => {
        this.savedProfile.set(profile);
        this.populateFormFromProfile(profile);
        this.currentStep.set(4); // Sari direct la sumarul profilului existent
        this.isLoading.set(false);
      },
      error: () => {
        // Dacă primește 404, înseamnă că nu există profil salvat -> afișează Pasul 1
        this.isLoading.set(false);
      }
    });
  }

  private populateFormFromProfile(p: UserProfile): void {
    this.displayName = p.displayName;
    this.gender = p.gender;
    this.age = p.age;
    this.heightCm = p.heightCm;
    this.weightKg = p.weightKg;
    this.activityLevel = p.activityLevel;
    this.goal = p.goal;
    this.goalPace = p.goalPace;
    this.selectedConditions = new Set(p.healthConditions);
    this.selectedRestrictions = new Set(p.dietaryRestrictions);
  }

  restartQuiz(): void {
    this.currentStep.set(1);
  }

  toggleCondition(condition: HealthCondition): void {
    if (condition === 'NONE') {
      this.selectedConditions.clear();
      this.selectedConditions.add('NONE');
      return;
    }
    this.selectedConditions.delete('NONE');
    if (this.selectedConditions.has(condition)) {
      this.selectedConditions.delete(condition);
      if (this.selectedConditions.size === 0) {
        this.selectedConditions.add('NONE');
      }
    } else {
      this.selectedConditions.add(condition);
    }
  }

  toggleRestriction(restriction: DietaryRestriction): void {
    if (restriction === 'NONE') {
      this.selectedRestrictions.clear();
      this.selectedRestrictions.add('NONE');
      return;
    }
    this.selectedRestrictions.delete('NONE');
    if (this.selectedRestrictions.has(restriction)) {
      this.selectedRestrictions.delete(restriction);
      if (this.selectedRestrictions.size === 0) {
        this.selectedRestrictions.add('NONE');
      }
    } else {
      this.selectedRestrictions.add(restriction);
    }
  }

  isConditionSelected(cond: HealthCondition): boolean {
    return this.selectedConditions.has(cond);
  }

  isRestrictionSelected(rest: DietaryRestriction): boolean {
    return this.selectedRestrictions.has(rest);
  }

  nextStep(): void {
    this.errorMessage.set('');
    if (this.currentStep() === 1) {
      if (!this.displayName.trim()) {
        this.errorMessage.set('Vă rugăm introduceți un nume.');
        return;
      }
      if (this.age < 14 || this.age > 100) {
        this.errorMessage.set('Vârsta trebuie să fie între 14 și 100 de ani.');
        return;
      }
      if (this.heightCm < 100 || this.heightCm > 250) {
        this.errorMessage.set('Înălțimea trebuie să fie între 100 și 250 cm.');
        return;
      }
      if (this.weightKg < 30 || this.weightKg > 300) {
        this.errorMessage.set('Greutatea trebuie să fie între 30 și 300 kg.');
        return;
      }
    }
    this.currentStep.update(s => s + 1);
  }

  prevStep(): void {
    this.errorMessage.set('');
    this.currentStep.update(s => s - 1);
  }

  submitOnboarding(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    const payload: UserProfileCreate = {
      displayName: this.displayName.trim(),
      gender: this.gender,
      age: this.age,
      heightCm: this.heightCm,
      weightKg: this.weightKg,
      activityLevel: this.activityLevel,
      goal: this.goal,
      goalPace: this.goalPace,
      healthConditions: Array.from(this.selectedConditions),
      dietaryRestrictions: Array.from(this.selectedRestrictions)
    };

    const existing = this.savedProfile();

    const request$ = existing
      ? this.profileApi.updateProfile(existing.id, payload)
      : this.profileApi.createProfile(payload);

    request$.subscribe({
      next: (profile) => {
        this.savedProfile.set(profile);
        this.isLoading.set(false);
        this.currentStep.set(4);
      },
      error: (err) => {
        this.isLoading.set(false);
        const serverMsg = err.error?.message || err.error?.errors?.displayName || 'A apărut o eroare la salvarea profilului.';
        this.errorMessage.set(serverMsg);
      }
    });
  }

  finish(): void {
    this.router.navigate(['/foods']);
  }
}