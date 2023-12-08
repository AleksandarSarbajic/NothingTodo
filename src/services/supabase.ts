import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://nrccltrdiqysnixakfna.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yY2NsdHJkaXF5c25peGFrZm5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxNTE1NjgsImV4cCI6MjAxNTcyNzU2OH0.crKU8cZ74VNy-X7g2OcTXEDY0E1DrpbRX6M_2FNKXto";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      settings: {
        Row: {
          all_lists: boolean;
          completed_lists: boolean;
          created_at: string;
          dueTodayTask: boolean;
          id: number;
          newTaskOnTop: boolean;
          planned_lists: boolean;
          primary_lists: boolean;
          primaryTaskOnTop: boolean;
          user_id: string | null;
        };
        Insert: {
          all_lists?: boolean;
          completed_lists?: boolean;
          created_at?: string;
          dueTodayTask?: boolean;
          id?: number;
          newTaskOnTop?: boolean;
          planned_lists?: boolean;
          primary_lists?: boolean;
          primaryTaskOnTop?: boolean;
          user_id?: string | null;
        };
        Update: {
          all_lists?: boolean;
          completed_lists?: boolean;
          created_at?: string;
          dueTodayTask?: boolean;
          id?: number;
          newTaskOnTop?: boolean;
          planned_lists?: boolean;
          primary_lists?: boolean;
          primaryTaskOnTop?: boolean;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "settings_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      "Task List": {
        Row: {
          created_at: string;
          edited_at: string | null;
          id: number;
          list_name: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          edited_at?: string | null;
          id?: number;
          list_name?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          edited_at?: string | null;
          id?: number;
          list_name?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Task List_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      Tasks: {
        Row: {
          category: string | null;
          created_at: string | null;
          description: string | null;
          due_date: string | null;
          edited_at: string | null;
          end_time: string | null;
          id: number;
          ListId: number | null;
          priority: boolean | null;
          start_time: string | null;
          status: string | null;
          task_name: string;
          user_id: string | null;
        };
        Insert: {
          category?: string | null;
          created_at?: string | null;
          description?: string | null;
          due_date?: string | null;
          edited_at?: string | null;
          end_time?: string | null;
          id?: number;
          ListId?: number | null;
          priority?: boolean | null;
          start_time?: string | null;
          status?: string | null;
          task_name: string;
          user_id?: string | null;
        };
        Update: {
          category?: string | null;
          created_at?: string | null;
          description?: string | null;
          due_date?: string | null;
          edited_at?: string | null;
          end_time?: string | null;
          id?: number;
          ListId?: number | null;
          priority?: boolean | null;
          start_time?: string | null;
          status?: string | null;
          task_name?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Tasks_ListId_fkey";
            columns: ["ListId"];
            isOneToOne: false;
            referencedRelation: "Task List";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Tasks_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
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
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

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
  : never;
