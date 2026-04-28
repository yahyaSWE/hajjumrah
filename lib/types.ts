export interface Section {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  icon_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Subsection {
  id: string;
  section_id: string;
  slug: string;
  title: string;
  description: string | null;
  icon_name: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ContentPage {
  id: string;
  subsection_id: string;
  slug: string;
  title: string;
  body: string;
  day_number: number | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  section_id: string;
  question: string;
  answer: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DuaCategory {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  icon_name: string | null;
  sort_order: number;
  created_at: string;
}

export interface Dua {
  id: string;
  category_id: string;
  title: string;
  arabic_text: string;
  transliteration: string;
  swedish_translation: string;
  context_note: string | null;
  audio_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface MapAsset {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  location_tag: string | null;
  sort_order: number;
  created_at: string;
}

// --- V2: Auth, Reseplan, Förberedelser ---

export interface Profile {
  id: string;
  display_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface TravelPlan {
  id: string;
  user_id: string;
  pilgrimage_type: 'hajj' | 'umrah';
  departure_date: string;
  return_date: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type PreparationCategory = 'dokument' | 'halsa' | 'packning' | 'andlig' | 'kunskap' | 'praktiskt';

export interface PreparationTemplate {
  id: string;
  pilgrimage_type: 'hajj' | 'umrah' | 'both';
  category: PreparationCategory;
  title: string;
  description: string | null;
  icon_name: string | null;
  weeks_before_departure: number;
  sort_order: number;
  created_at: string;
}

export interface UserTask {
  id: string;
  user_id: string;
  travel_plan_id: string;
  template_id: string;
  is_completed: boolean;
  completed_at: string | null;
  created_at: string;
}

export interface UserTaskWithTemplate extends UserTask {
  template: PreparationTemplate;
  due_date: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  item_type: 'content_page' | 'dua' | 'faq';
  item_id: string;
  created_at: string;
}

export interface NotificationPreferences {
  id: string;
  user_id: string;
  push_enabled: boolean;
  reminder_time: string;
  week_before_reminder: boolean;
  day_before_reminder: boolean;
  created_at: string;
  updated_at: string;
}
