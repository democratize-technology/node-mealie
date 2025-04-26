/**
 * Recipe types
 */

export interface Recipe {
  id: string;
  groupId: string;
  userId: string;
  householdId: string;
  name: string;
  slug?: string;
  image?: string;
  description?: string;
  recipeYield?: string;
  recipeIngredient?: RecipeIngredient[];
  recipeInstructions?: RecipeInstruction[];
  totalTime?: string;
  prepTime?: string;
  performTime?: string;
  nutrition?: RecipeNutrition;
  recipeCategory?: RecipeCategory[];
  tags?: RecipeTag[];
  tools?: RecipeTool[];
  rating?: number;
  orgURL?: string;
  dateAdded?: string;
  dateUpdated?: string;
  createdAt?: string;
  updatedAt?: string;
  lastMade?: string;
}

export interface RecipeIngredient {
  quantity?: number;
  unit?: string;
  food?: string;
  note?: string;
  isFood?: boolean;
  disableAmount?: boolean;
  display?: string;
}

export interface RecipeInstruction {
  id?: string;
  title?: string;
  text: string;
  ingredientReferences?: RecipeIngredient[];
}

export interface RecipeNutrition {
  calories?: string;
  fatContent?: string;
  proteinContent?: string;
  carbohydrateContent?: string;
  fiberContent?: string;
  sodiumContent?: string;
  sugarContent?: string;
}

export interface RecipeCategory {
  id?: string;
  name: string;
  slug: string;
}

export interface RecipeTag {
  id?: string;
  name: string;
  slug: string;
}

export interface RecipeTool {
  id: string;
  name: string;
  slug: string;
  onHand?: boolean;
}

export interface RecipeSummary {
  id: string;
  userId?: string;
  groupId?: string;
  householdId?: string;
  name?: string;
  slug?: string;
  image?: string;
  description?: string;
  recipeCategory?: RecipeCategory[];
  tags?: RecipeTag[];
  tools?: RecipeTool[];
  rating?: number;
  dateAdded?: string;
  dateUpdated?: string;
}
