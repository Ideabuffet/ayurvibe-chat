export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string;
  instructions: string;
  benefits: string;
  preparation_time: string;
  type: 'tea' | 'oil' | 'decoction';
  created_at: string;
}