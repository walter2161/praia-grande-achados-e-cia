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
      categories: {
        Row: {
          created_at: string | null
          icon: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      listings: {
        Row: {
          address: string | null
          amenities: string[] | null
          availability: string | null
          bathrooms: number | null
          bedrooms: number | null
          benefits: string[] | null
          brand: string | null
          category: string
          color: string | null
          company_contact: string | null
          company_name: string | null
          created_at: string | null
          date: string | null
          description: string | null
          education: string | null
          experience: string | null
          finalidade: string | null
          fuel: string | null
          has_garage: boolean | null
          id: string
          images: string[] | null
          job_type: string | null
          latitude: number | null
          location: string | null
          longitude: number | null
          mileage: number | null
          model: string | null
          price: number | null
          price_description: string | null
          property_type: string | null
          provider_contact: string | null
          provider_name: string | null
          rating: number | null
          salary: number | null
          service_type: string | null
          size: number | null
          status: string | null
          subcategory: string | null
          title: string
          transmission: string | null
          updated_at: string | null
          user_id: string | null
          year: number | null
        }
        Insert: {
          address?: string | null
          amenities?: string[] | null
          availability?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          benefits?: string[] | null
          brand?: string | null
          category: string
          color?: string | null
          company_contact?: string | null
          company_name?: string | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          education?: string | null
          experience?: string | null
          finalidade?: string | null
          fuel?: string | null
          has_garage?: boolean | null
          id?: string
          images?: string[] | null
          job_type?: string | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          mileage?: number | null
          model?: string | null
          price?: number | null
          price_description?: string | null
          property_type?: string | null
          provider_contact?: string | null
          provider_name?: string | null
          rating?: number | null
          salary?: number | null
          service_type?: string | null
          size?: number | null
          status?: string | null
          subcategory?: string | null
          title: string
          transmission?: string | null
          updated_at?: string | null
          user_id?: string | null
          year?: number | null
        }
        Update: {
          address?: string | null
          amenities?: string[] | null
          availability?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          benefits?: string[] | null
          brand?: string | null
          category?: string
          color?: string | null
          company_contact?: string | null
          company_name?: string | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          education?: string | null
          experience?: string | null
          finalidade?: string | null
          fuel?: string | null
          has_garage?: boolean | null
          id?: string
          images?: string[] | null
          job_type?: string | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          mileage?: number | null
          model?: string | null
          price?: number | null
          price_description?: string | null
          property_type?: string | null
          provider_contact?: string | null
          provider_name?: string | null
          rating?: number | null
          salary?: number | null
          service_type?: string | null
          size?: number | null
          status?: string | null
          subcategory?: string | null
          title?: string
          transmission?: string | null
          updated_at?: string | null
          user_id?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "listings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          city: string | null
          created_at: string | null
          document_number: string | null
          document_type: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          role: string | null
          state: string | null
          username: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string | null
          document_number?: string | null
          document_type?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          role?: string | null
          state?: string | null
          username?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string | null
          document_number?: string | null
          document_type?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string | null
          state?: string | null
          username?: string | null
          zip_code?: string | null
        }
        Relationships: []
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
