/**
 * Ingredient parser related types
 */

/**
 * Parsed ingredient result from the NLP parser
 */
export interface ParsedIngredient {
  /** Original input string */
  input?: string;
  
  /** Confidence score for the parsing */
  confidence?: number;
  
  /** Parsed quantity */
  quantity?: number;
  
  /** Parsed quantity2 (for ranges like 1-2) */
  quantity2?: number;
  
  /** Unit of measurement */
  unit?: string;
  
  /** Food item or ingredient */
  food?: string;
  
  /** Additional notes or comments */
  comment?: string;
  
  /** Original text that resulted in this parse */
  original?: string;
  
  /**
   * Mealie automatically includes a RecipeIngredient representation if found
   * This can be used to get direct ingredient info with existing Mealie IDs
   */
  ingredient?: {
    id?: string;
    quantity?: number;
    unit?: {
      id?: string;
      name?: string;
      description?: string;
      fraction?: boolean;
      abbreviation?: string;
      useAbbreviation?: boolean;
    };
    food?: {
      id?: string;
      name?: string;
      description?: string;
      labelId?: string;
    };
    note?: string;
    isFood?: boolean;
    disableAmount?: boolean;
    display?: string;
    title?: string;
    originalText?: string;
    referenceId?: string;
  };
}

/**
 * Request payload for single ingredient parsing
 */
export interface IngredientRequest {
  /** The ingredient string to parse */
  ingredient: string;
}

/**
 * Request payload for bulk ingredient parsing
 */
export interface IngredientsRequest {
  /** Array of ingredient strings to parse */
  ingredients: string[];
}
