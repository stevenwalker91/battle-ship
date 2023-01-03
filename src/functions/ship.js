export const Ship = (length) => {
  let hits = 0;

  const hit = () => {
    hits ++;
  }

  const isSunk = () => {
    if (length === hits) return true;
    return false;
  }

  return {
    length,
    get hits() {
      return hits;
    },
    hit,
    isSunk
  }
}