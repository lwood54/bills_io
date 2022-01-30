export const sortByName = <T extends { name: string }>(list: T[]): T[] => {
  return list.sort((a, b) => {
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
    return 0;
  });
};
