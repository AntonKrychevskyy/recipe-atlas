import { useMemo } from 'react';

export const useCatalogueHeading = (searchParams: Record<string, string>) => {
  const { a, c, i } = searchParams;
  const heading = useMemo(() => {
    if (a && a.trim()) return `${a.trim().replaceAll('_', ' ')} Recipes`;
    if (c && c.trim()) return `${c.trim().replaceAll('_', ' ')} Recipes`;
    if (i && i.trim()) return `Recipes with ${i.trim().replaceAll('_', ' ')}`;
    return 'All Recipes';
  }, [a, c, i]);

  return heading;
};
