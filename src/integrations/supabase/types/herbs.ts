export interface Herb {
  id: string;
  name: string;
  sanskrit_name: string | null;
  description: string;
  benefits: string;
  contraindications: string | null;
  image_url: string | null;
  created_at: string;
}