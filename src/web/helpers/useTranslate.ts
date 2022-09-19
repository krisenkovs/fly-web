export function useTranslate(translate?: Record<string, unknown>) {
  const t = (key: string): string => {
    let item: any = translate;
    key.split('.').forEach((path) => {
      if (typeof item === 'object' && item?.[path]) {
        item = item?.[path];
      } else {
        return item;
      }
    });

    if (typeof item === 'string') {
      return item;
    }

    return key;
  };

  return t;
}
