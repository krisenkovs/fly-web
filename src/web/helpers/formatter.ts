export function formatDateTime(value: string) {
  if (!value) {
    return '';
  }

  const date = new Date(value);

  return `${date.toLocaleDateString('ru-RU')} ${date.toLocaleTimeString('ru-RU')}`;
}
