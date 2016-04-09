const { floor, random } = Math;

export const getRandEl = (arr) => arr[floor( random() * arr.length )];
