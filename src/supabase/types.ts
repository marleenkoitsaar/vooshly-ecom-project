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
      collections: {
        Row: {
          created_at: string
          description: string
          id: number
          image: string
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          image: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          image?: string
          title?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          address: string | null
          created_at: string
          email: string | null
          id: number
          phone: string | null
          user_id: number | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: number
          phone?: string | null
          user_id?: number | null
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: number
          phone?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_customers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      orders: {
        Row: {
          created_at: string
          customer_id: number | null
          id: number
          payment_status: string | null
          product_ids: Json | null
          status: string | null
          total: number | null
        }
        Insert: {
          created_at?: string
          customer_id?: number | null
          id?: number
          payment_status?: string | null
          product_ids?: Json | null
          status?: string | null
          total?: number | null
        }
        Update: {
          created_at?: string
          customer_id?: number | null
          id?: number
          payment_status?: string | null
          product_ids?: Json | null
          status?: string | null
          total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          collection_id: number | null
          created_at: string
          description: string | null
          id: number
          image: string | null
          in_stock: boolean | null
          price: number | null
          title: string | null
        }
        Insert: {
          collection_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          image?: string | null
          in_stock?: boolean | null
          price?: number | null
          title?: string | null
        }
        Update: {
          collection_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          image?: string | null
          in_stock?: boolean | null
          price?: number | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_products_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          id: number
          password: string | null
          phone: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          password?: string | null
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          password?: string | null
          phone?: string | null
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
