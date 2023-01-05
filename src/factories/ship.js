
export const Ship = (length, type) => {
  let hits = 0;

  const hit = () => {
    hits ++;
  }

  const isSunk = () => {
    if (length <= hits) return true;
    return false;
  }

  return {
    length,
    type,
    get hits() {
      return hits;
    },
    hit,
    isSunk
  }
}