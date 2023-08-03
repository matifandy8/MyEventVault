export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: number;
          user_id: string;
          name: string;
          description: string;
          date: string;
          image?: string | null;
        };
        Insert: {
          id?: number;
          user_id: string;
          name?: string;
          description?: string;
          date?: string;
          image?: string | null;
        };
        Delete: {
          id: number;
          user_id: string;
          name?: string;
          description?: string;
          date?: string;
          image?: string | null;
        };
        Update: {
          id?: number;
          user_id?: string;
          name?: string;
          description?: string;
          date?: string;
          image?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
