// eslint-disable-next-line import/prefer-default-export
export const wasButtonClicked = (sketch, button, mX, mY) => sketch.collidePointRect(
  mX,
  mY,
  button.x,
  button.y,
  button.w,
  button.h,
);
