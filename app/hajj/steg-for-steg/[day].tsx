import { useLocalSearchParams, Stack } from 'expo-router';
import { useContentPage } from '@/hooks/useContent';
import { ContentRenderer } from '@/components/content/ContentRenderer';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorView } from '@/components/ui/ErrorView';

export default function HajjDayDetail() {
  const { day } = useLocalSearchParams<{ day: string }>();
  const { data, isLoading, error, refetch } = useContentPage('hajj', 'steg-for-steg', day ?? '');

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorView onRetry={refetch} />;

  return (
    <>
      <Stack.Screen options={{ title: data?.title ?? '' }} />
      <ContentRenderer content={data?.body ?? '*Innehåll kommer snart...*'} />
    </>
  );
}
