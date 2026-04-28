import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { ContentPage, FAQ } from '@/lib/types';

export function useContentPages(sectionSlug: string, subsectionSlug: string) {
  return useQuery<ContentPage[]>({
    queryKey: ['content-pages', sectionSlug, subsectionSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content_pages')
        .select('*, subsection:subsections!inner(slug, section:sections!inner(slug))')
        .eq('subsections.slug', subsectionSlug)
        .eq('subsections.sections.slug', sectionSlug)
        .order('sort_order');
      if (error) throw error;
      return data;
    },
    enabled: !!sectionSlug && !!subsectionSlug,
  });
}

export function useContentPage(sectionSlug: string, subsectionSlug: string, pageSlug: string) {
  return useQuery<ContentPage | null>({
    queryKey: ['content-page', sectionSlug, subsectionSlug, pageSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content_pages')
        .select('*, subsection:subsections!inner(slug, section:sections!inner(slug))')
        .eq('subsections.slug', subsectionSlug)
        .eq('subsections.sections.slug', sectionSlug)
        .eq('slug', pageSlug)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!sectionSlug && !!subsectionSlug && !!pageSlug,
  });
}

export function useFAQs(sectionSlug: string) {
  return useQuery<FAQ[]>({
    queryKey: ['faqs', sectionSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('faqs')
        .select('*, section:sections!inner(slug)')
        .eq('sections.slug', sectionSlug)
        .order('sort_order');
      if (error) throw error;
      return data;
    },
    enabled: !!sectionSlug,
  });
}
