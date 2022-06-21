let drawHead = (context, x, y, sqSize, direction) => {
  let fR = context.fillRect.bind(context);
  fR(x * sqSize, y * sqSize, sqSize / 4, sqSize / 4);
  fR(x * sqSize, y * sqSize + (sqSize / 4 * 2), sqSize / 4, sqSize / 4);
  fR(x * sqSize + (sqSize / 4), y * sqSize + (sqSize / 4), sqSize / 2, sqSize / 2);
}

let drawOpenMouth = (context, x, y, sqSize, direction) => {
  let fR = context.fillRect.bind(context);
  fR(x * sqSize, y * sqSize, sqSize / 4, sqSize / 4);
  fR(x * sqSize, y * sqSize + (sqSize / 2), sqSize / 4, sqSize / 4);
  fR(x * sqSize + (sqSize / 4), y * sqSize + (sqSize / 4), sqSize / 4, sqSize / 2);
  fR(x * sqSize + (sqSize / 2), y * sqSize, sqSize / 4, sqSize / 4);
  fR(x * sqSize + (sqSize / 2), y * sqSize + (sqSize / 4 * 3), sqSize / 4, sqSize / 4);
}

let drawBody = (context, x, y, sqSize, direction) => {
  let fR = context.fillRect.bind(context);
  fR(x * sqSize, y * sqSize + (sqSize / 4), sqSize / 4, sqSize / 2);
  fR(x * sqSize + (sqSize / 4 * 3), y * sqSize + (sqSize / 4), sqSize / 4, sqSize / 2);
  fR(x * sqSize + (sqSize / 4), y * sqSize + (sqSize / 4), sqSize / 4, sqSize / 4);
  fR(x * sqSize + (sqSize / 2), y * sqSize + (sqSize / 2), sqSize / 4, sqSize / 4);
}

let drawFatBody = (context, x, y, sqSize, direction) => {
  let fR = context.fillRect.bind(context);
  fR(x * sqSize, y * sqSize + (sqSize / 4), sqSize / 4, sqSize / 2);
  fR(x * sqSize + (sqSize / 4 * 3), y * sqSize + (sqSize / 4), sqSize / 4, sqSize / 2);
  fR(x * sqSize + (sqSize / 4), y * sqSize, sqSize / 4, sqSize / 2);
  fR(x * sqSize + (sqSize / 4 * 2), y * sqSize + (sqSize / 4 * 2), sqSize / 4, sqSize / 2);
  fR(x * sqSize + (sqSize / 4 * 2), y * sqSize, sqSize / 4, sqSize / 4);
  fR(x * sqSize + (sqSize / 4), y * sqSize + (sqSize / 4 * 3), sqSize / 4, sqSize / 4);
}

let drawCornerBody = (context, x, y, sqSize, direction) => {
  let fR = context.fillRect.bind(context);
  fR(x * sqSize, y * sqSize + (sqSize / 4), sqSize / 4, sqSize / 2);
  fR(x * sqSize + (sqSize / 4), y * sqSize + (sqSize / 4 * 3), sqSize / 2, sqSize / 4);
  fR(x * sqSize + (sqSize / 4), y * sqSize + (sqSize / 4), sqSize / 4, sqSize / 4);
  fR(x * sqSize + (sqSize / 4 * 2), y * sqSize + (sqSize / 4 * 2), sqSize / 4, sqSize / 4);
}


let drawTail = (context, x, y, sqSize, direction) => {
  let fR = context.fillRect.bind(context);
  fR(x * sqSize, y * sqSize + (sqSize / 2), sqSize, sqSize / 4);
  fR(x * sqSize + (sqSize / 4 * 2), y * sqSize + (sqSize / 4), sqSize / 2, sqSize / 4);
}

let drawApple = (context, x, y, sqSize, direction) => {
  let fR = context.fillRect.bind(context);
  fR(x * sqSize + (sqSize / 4), y * sqSize, sqSize / 4, sqSize / 4);
  fR(x * sqSize, y * sqSize + (sqSize / 4), sqSize / 4, sqSize / 4);
  fR(x * sqSize + (sqSize / 2), y * sqSize + (sqSize / 4), sqSize / 4, sqSize / 4);
  fR(x * sqSize + (sqSize / 4), y * sqSize + (sqSize / 2), sqSize / 4, sqSize / 4);
}

export {drawHead, drawOpenMouth, drawBody, drawFatBody, drawCornerBody, drawTail, drawApple};