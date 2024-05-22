export const shuffle = (array: number[]) => {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

export const createArray = (low: number, high: number) => {
  let array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
};
