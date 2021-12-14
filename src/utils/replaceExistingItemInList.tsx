export default function replaceExistingItemInList(
  updatedItem: any,
  list: any[],
  updater: (updatedList: any[]) => void,
): any {
  if (!list) return;

  const itemIndex = list.findIndex(x => x.id === updatedItem.id);
  if (itemIndex !== -1) {
    list.splice(itemIndex, 1, updatedItem);
    updater(list);
  }
};
