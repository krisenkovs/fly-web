export function formatDateTime(value?: string) {
  if (!value) {
    return '';
  }

  const date = new Date(value);

  return `${date.toLocaleDateString('ru-RU')} ${date.toLocaleTimeString('ru-RU')}`;
}

export function formatDate(value?: string) {
  if (!value) {
    return '';
  }

  const date = new Date(value);

  return `${date.toLocaleDateString('ru-RU')}`;
}

export function formatTime(value?: string) {
  if (!value) {
    return '';
  }

  const date = new Date(value);

  return `${date.toLocaleTimeString('ru-RU')}`;
}

export function diffDate(from?: string, to?: string) {
  if (!from || !to){
    return ''
  }

  const startDate = Date.parse(from);
  const endDate = Date.parse(to);
  const diff = (endDate - startDate) / 60000;

  const hours = Math.trunc(diff / 60);
  const minutes = Math.trunc(diff % 60);

  return hours ? `${hours} ч. ${minutes} мин` : `${minutes} мин`;
}
