
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
      profiles: {
        Row: {
          id: string
          username: string | null
          document_type: 'cpf' | 'cnpj' | null
          document_number: string | null
          full_name: string | null
          email: string | null
          phone: string | null
          address: string | null
          city: string | null
          state: string | null
          zip_code: string | null
          role: 'user' | 'admin'
          created_at: string
          approval_status?: 'pending' | 'approved' | 'rejected'
        }
        Insert: {
          id: string
          username?: string | null
          document_type?: 'cpf' | 'cnpj' | null
          document_number?: string | null
          full_name?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          role?: 'user' | 'admin'
          created_at?: string
          approval_status?: 'pending' | 'approved' | 'rejected'
        }
        Update: {
          id?: string
          username?: string | null
          document_type?: 'cpf' | 'cnpj' | null
          document_number?: string | null
          full_name?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          role?: 'user' | 'admin'
          created_at?: string
          approval_status?: 'pending' | 'approved' | 'rejected'
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          icon: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          icon?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          icon?: string | null
          created_at?: string
        }
      }
      listings: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          price: number | null
          price_description: string | null
          images: string[]
          location: string | null
          address: string | null
          latitude: number | null
          longitude: number | null
          date: string
          category: string
          subcategory: string | null
          status: 'active' | 'inactive' | 'pending' | 'rejected'
          brand: string | null
          model: string | null
          year: number | null
          mileage: number | null
          fuel: string | null
          transmission: string | null
          color: string | null
          salary: number | null
          company_name: string | null
          company_contact: string | null
          job_type: string | null
          education: string | null
          experience: string | null
          benefits: string[] | null
          property_type: string | null
          size: number | null
          bedrooms: number | null
          bathrooms: number | null
          has_garage: boolean | null
          amenities: string[] | null
          finalidade: string | null
          service_type: string | null
          provider_name: string | null
          provider_contact: string | null
          availability: string | null
          rating: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          price?: number | null
          price_description?: string | null
          images?: string[]
          location?: string | null
          address?: string | null
          latitude?: number | null
          longitude?: number | null
          date?: string
          category: string
          subcategory?: string | null
          status?: 'active' | 'inactive' | 'pending' | 'rejected'
          brand?: string | null
          model?: string | null
          year?: number | null
          mileage?: number | null
          fuel?: string | null
          transmission?: string | null
          color?: string | null
          salary?: number | null
          company_name?: string | null
          company_contact?: string | null
          job_type?: string | null
          education?: string | null
          experience?: string | null
          benefits?: string[] | null
          property_type?: string | null
          size?: number | null
          bedrooms?: number | null
          bathrooms?: number | null
          has_garage?: boolean | null
          amenities?: string[] | null
          finalidade?: string | null
          service_type?: string | null
          provider_name?: string | null
          provider_contact?: string | null
          availability?: string | null
          rating?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          price?: number | null
          price_description?: string | null
          images?: string[]
          location?: string | null
          address?: string | null
          latitude?: number | null
          longitude?: number | null
          date?: string
          category?: string
          subcategory?: string | null
          status?: 'active' | 'inactive' | 'pending' | 'rejected'
          brand?: string | null
          model?: string | null
          year?: number | null
          mileage?: number | null
          fuel?: string | null
          transmission?: string | null
          color?: string | null
          salary?: number | null
          company_name?: string | null
          company_contact?: string | null
          job_type?: string | null
          education?: string | null
          experience?: string | null
          benefits?: string[] | null
          property_type?: string | null
          size?: number | null
          bedrooms?: number | null
          bathrooms?: number | null
          has_garage?: boolean | null
          amenities?: string[] | null
          finalidade?: string | null
          service_type?: string | null
          provider_name?: string | null
          provider_contact?: string | null
          availability?: string | null
          rating?: number | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
