export default function calculateTotalHeight(ids: string[], buffer?: number = 0): number {
  let totalHeight = 0;
  for (let index = 0; index < ids.length; index++) {
    const element = document.getElementById(ids[index]);
    totalHeight += (element?.offsetHeight || 0);
  }
  return totalHeight + buffer;
};
