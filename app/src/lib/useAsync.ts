import React from 'react';

/** Tiny data-loading hook: runs `fn`, exposes value/loading/reload. */
export function useAsync<T>(fn: () => Promise<T>, deps: React.DependencyList) {
  const [value, setValue] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);
  const fnRef = React.useRef(fn);
  fnRef.current = fn;

  const reload = React.useCallback(async () => {
    const v = await fnRef.current();
    setValue(v);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    setLoading(true);
    void reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { value, loading, reload };
}
