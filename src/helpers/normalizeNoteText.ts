export const normalizeNoteText = (text: string) => {
  return text.split(' ').length > 15
    ? text.split(' ').slice(0, 16).join(' ') + '...'
    : text;
};
