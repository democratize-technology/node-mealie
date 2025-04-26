export interface RecipeShareToken {
  recipeId: string;
  groupId: string;
  id: string;
  createdAt: string;
  recipe: RecipeOutput;
}

export interface RecipeShareTokenSummary {
  recipeId: string;
  groupId: string;
  id: string;
  createdAt: string;
}

export interface RecipeShareTokenCreate {
  recipeId: string;
}

export interface RecipeOutput {
  [key: string]: any; // Placeholder, should be refined based on actual schema
}

export interface RecipeShareTokenQueryParams {
  recipeId?: string;
}
