export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  dominantMacro: 'PROTEIN' | 'CARBOHYDRATE' | 'FAT';
}