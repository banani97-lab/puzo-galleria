import { useState, useEffect } from 'react';

export function CustomClientOnly({ children, fallback }: { children: () => JSX.Element; fallback?: JSX.Element }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return fallback;
  return children();
}
