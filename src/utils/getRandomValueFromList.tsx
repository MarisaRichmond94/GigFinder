export default function getRandomValueFromList(list: any[]): any {
  const randomIndex = Math.floor(Math.random() * list.length + 1);
  return list[randomIndex];
};
