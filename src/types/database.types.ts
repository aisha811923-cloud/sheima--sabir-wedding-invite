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
      wedding_rsvps: {
        Row: {
          id: string
          created_at: string
          guest_name: string
          phone_number: string
          guest_count?: number
          attending_haldi: boolean
          attending_barat: boolean
          dua_message?: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          guest_name: string
          phone_number: string
          guest_count?: number
          attending_haldi?: boolean
          attending_barat?: boolean
          dua_message?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          guest_name?: string
          phone_number?: string
          guest_count?: number
          attending_haldi?: boolean
          attending_barat?: boolean
          dua_message?: string | null
        }
        Relationships: []
      }
      guest_duas: {
        Row: {
          id: string
          created_at: string
          sender_name: string
          dua_message: string
          is_approved: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          sender_name: string
          dua_message: string
          is_approved?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          sender_name?: string
          dua_message?: string
          is_approved?: boolean
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

export type WeddingRsvp = Database['public']['Tables']['wedding_rsvps']['Row']
export type WeddingRsvpInsert = Database['public']['Tables']['wedding_rsvps']['Insert']

export type GuestDua = Database['public']['Tables']['guest_duas']['Row']
export type GuestDuaInsert = Database['public']['Tables']['guest_duas']['Insert']
