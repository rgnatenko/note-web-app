export const createNoteDate = (date: Date) => {
  const [, month, day, year] = date.toString().split(' ');

  return `${month} ${day}, ${year}`;
};
