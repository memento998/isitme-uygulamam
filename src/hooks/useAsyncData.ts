import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect } from 'expo-router';

interface AsyncDataState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

/**
 * Ekrana her odaklanıldığında veriyi yeniden yükler.
 * İlk yüklemede "loading", hata durumunda "error" durumlarını yönetir.
 */
export function useAsyncData<T>(loader: () => Promise<T>, errorMessage?: string): AsyncDataState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const loaderRef = useRef(loader);
  const errorMessageRef = useRef(errorMessage);
  useEffect(() => {
    loaderRef.current = loader;
    errorMessageRef.current = errorMessage;
  });

  const reload = useCallback(async () => {
    try {
      setError(null);
      const result = await loaderRef.current();
      setData(result);
    } catch (err) {
      console.warn('Veri yüklenemedi:', err);
      setError(errorMessageRef.current ?? 'Veriler yüklenirken bir sorun oluştu.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void reload();
    }, [reload])
  );

  return { data, loading, error, reload };
}
