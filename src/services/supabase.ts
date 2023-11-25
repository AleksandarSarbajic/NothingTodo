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
          priority: string | null;
          start_time: string | null;
          status: string | null;
          task_name: string | null;
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
          priority?: string | null;
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
          priority?: string | null;
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
