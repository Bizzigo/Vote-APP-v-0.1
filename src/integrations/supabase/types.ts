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
      candidates: {
        Row: {
          city: string | null
          created_at: string | null
          description: string | null
          district: string | null
          id: string
          name: string
          photo: string | null
          updated_at: string | null
          vote_count: number | null
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          description?: string | null
          district?: string | null
          id?: string
          name: string
          photo?: string | null
          updated_at?: string | null
          vote_count?: number | null
        }
        Update: {
          city?: string | null
          created_at?: string | null
          description?: string | null
          district?: string | null
          id?: string
          name?: string
          photo?: string | null
          updated_at?: string | null
          vote_count?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          has_voted: boolean | null
          id: string
          name: string | null
          profile_completed: boolean | null
          provider: string | null
          role: string | null
          subscription_plan: string | null
          subscription_status: string | null
          updated_at: string | null
          voted_for: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          has_voted?: boolean | null
          id: string
          name?: string | null
          profile_completed?: boolean | null
          provider?: string | null
          role?: string | null
          subscription_plan?: string | null
          subscription_status?: string | null
          updated_at?: string | null
          voted_for?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          has_voted?: boolean | null
          id?: string
          name?: string | null
          profile_completed?: boolean | null
          provider?: string | null
          role?: string | null
          subscription_plan?: string | null
          subscription_status?: string | null
          updated_at?: string | null
          voted_for?: string | null
        }
        Relationships: []
      }
      vendors: {
        Row: {
          category: string | null
          city: string | null
          created_at: string | null
          description: string | null
          email: string | null
          facebook: string | null
          id: string
          instagram: string | null
          keywords: string[] | null
          lat: number | null
          linkedin: string | null
          lng: number | null
          logo: string | null
          name: string
          phone: string | null
          rating: number | null
          twitter: string | null
          updated_at: string | null
          user_id: string | null
          website: string | null
        }
        Insert: {
          category?: string | null
          city?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          facebook?: string | null
          id?: string
          instagram?: string | null
          keywords?: string[] | null
          lat?: number | null
          linkedin?: string | null
          lng?: number | null
          logo?: string | null
          name: string
          phone?: string | null
          rating?: number | null
          twitter?: string | null
          updated_at?: string | null
          user_id?: string | null
          website?: string | null
        }
        Update: {
          category?: string | null
          city?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          facebook?: string | null
          id?: string
          instagram?: string | null
          keywords?: string[] | null
          lat?: number | null
          linkedin?: string | null
          lng?: number | null
          logo?: string | null
          name?: string
          phone?: string | null
          rating?: number | null
          twitter?: string | null
          updated_at?: string | null
          user_id?: string | null
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_vote_count: {
        Args: {
          candidate_id: string
        }
        Returns: undefined
      }
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
