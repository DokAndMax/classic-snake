export function getSkin(skin, ...parameters) {
  let curSkin = skins[skin];
  for (let i = 0; true; i++) {
    if (Array.isArray(curSkin))
      return curSkin;
    curSkin = curSkin[parameters[i] ?? 'false'];
  }
}

const skins = {
  mouth: { //isOpen
    false:
      [[1, 0], [1, 2], [0, 2], [0, 3], [3, 3], [3, 1], [0, 1], [0, 0]],
    true: [[1, 0], [0, 0], [0, 1], [3, 1], [3, 0], [2, 0], [2, 4], [3, 4],
      [3, 3], [0, 3], [0, 2], [1, 2]],
  },

  tail: [[0, 2], [2, 2], [2, 1], [4, 1], [4, 3], [0, 3]],

  body: { // isFat, isCorner
    false: {
      false: [[2, 1], [0, 1], [0, 3], [1, 3], [1, 2], [3, 2], [3, 1], [4, 1],
        [4, 3], [2, 3]],
      true: [[3, 2], [2, 2], [2, 1], [4, 1], [4, 3], [2, 3], [2, 2], [1, 2],
        [1, 4], [3, 4]],
    },
    true: {
      false: [[2, 1], [3, 1], [3, 0], [1, 0], [1, 1], [0, 1], [0, 3], [1, 3],
        [1, 2], [3, 2], [3, 1], [4, 1], [4, 3], [3, 3], [3, 4], [1, 4], [1, 3],
        [2, 3]],
      true: [[3, 2], [2, 2], [2, 1], [4, 1], [4, 4], [1, 4], [1, 2],
        [2, 2], [2, 3], [3, 3]],
    },
  },

  apple: [[2, 3], [2, 0], [1, 0], [1, 1], [3, 1], [3, 2], [0, 2], [0, 1],
    [1, 1], [1, 3]],
};