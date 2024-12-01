import type { Herb } from './herbs';
import type { Profile } from './profiles';
import type { Recipe } from './recipes';

export * from './herbs';
export * from './profiles';
export * from './recipes';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      herbs: {
        Row: Herb;
        Insert: Omit<Herb, 'id' | 'created_at'>;
        Update: Partial<Omit<Herb, 'id' | 'created_at'>>;
      };
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at'>;
        Update: Partial<Omit<Profile, 'created_at'>>;
      };
      recipes: {
        Row: Recipe;
        Insert: Omit<Recipe, 'id' | 'created_at'>;
        Update: Partial<Omit<Recipe, 'id' | 'created_at'>>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}