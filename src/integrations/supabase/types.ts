export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      combinations: {
        Row: {
          benefits: string
          contraindications: string | null
          created_at: string
          description: string
          herbs: string
          id: string
          instructions: string
          name: string
          proportions: string
          purpose: string
        }
        Insert: {
          benefits: string
          contraindications?: string | null
          created_at?: string
          description: string
          herbs: string
          id?: string
          instructions: string
          name: string
          proportions?: string
          purpose: string
        }
        Update: {
          benefits?: string
          contraindications?: string | null
          created_at?: string
          description?: string
          herbs?: string
          id?: string
          instructions?: string
          name?: string
          proportions?: string
          purpose?: string
        }
        Relationships: []
      }
      herbs: {
        Row: {
          benefits: string
          contraindications: string | null
          created_at: string
          description: string
          id: string
          image_url: string | null
          name: string
          sanskrit_name: string | null
        }
        Insert: {
          benefits: string
          contraindications?: string | null
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          name: string
          sanskrit_name?: string | null
        }
        Update: {
          benefits?: string
          contraindications?: string | null
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          name?: string
          sanskrit_name?: string | null
        }
        Relationships: []
      }
      languages: {
        Row: {
          id: string
          name: string
          native_name: string
        }
        Insert: {
          id: string
          name: string
          native_name: string
        }
        Update: {
          id?: string
          name?: string
          native_name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          dosha: string | null
          id: string
          kapha_score: number | null
          pitta_score: number | null
          vata_score: number | null
        }
        Insert: {
          created_at?: string
          dosha?: string | null
          id: string
          kapha_score?: number | null
          pitta_score?: number | null
          vata_score?: number | null
        }
        Update: {
          created_at?: string
          dosha?: string | null
          id?: string
          kapha_score?: number | null
          pitta_score?: number | null
          vata_score?: number | null
        }
        Relationships: []
      }
      recipes: {
        Row: {
          benefits: string
          created_at: string
          description: string
          id: string
          ingredients: string
          instructions: string
          name: string
          preparation_time: string
          type: string
        }
        Insert: {
          benefits: string
          created_at?: string
          description: string
          id?: string
          ingredients: string
          instructions: string
          name: string
          preparation_time: string
          type: string
        }
        Update: {
          benefits?: string
          created_at?: string
          description?: string
          id?: string
          ingredients?: string
          instructions?: string
          name?: string
          preparation_time?: string
          type?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          subscription_end_date: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          subscription_end_date?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          subscription_end_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      translations: {
        Row: {
          created_at: string
          id: string
          key: string
          language_id: string | null
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          language_id?: string | null
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          language_id?: string | null
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "translations_language_id_fkey"
            columns: ["language_id"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
