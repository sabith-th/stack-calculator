const PRESS_NUM = 'PRESS_NUM';
const ENTER = 'ENTER';
const OPERATION = 'OPERATION';

export const pressNum = n => ({
  type: PRESS_NUM,
  payload: n,
});

export const enter = () => ({
  type: ENTER,
});

export const operation = op => ({
  type: OPERATION,
  payload: op,
});

const doOperation = (a, b, op) => {
  const x = parseFloat(a);
  const y = parseFloat(b);
  if (op === 'Pow') {
    return y ** x;
  }
  if (op === '+') {
    return y + x;
  }
  if (op === '-') {
    return y - x;
  }
  if (op === 'X') {
    return y * x;
  }
  if (op === '/') {
    return y / x;
  }
  return 0;
};

const initialState = { stack: [], inputState: 'replace' };

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PRESS_NUM:
      if (state.inputState === 'append') {
        return {
          stack: [(state.stack[0] || '0') + payload, ...state.stack.slice(1)],
          inputState: 'append',
        };
      }
      if (state.inputState === 'replace') {
        return {
          stack: [payload, ...state.stack.slice(1)],
          inputState: 'append',
        };
      }
      if (state.inputState === 'push') {
        return {
          stack: [payload, ...state.stack],
          inputState: 'append',
        };
      }
      return state;
    case ENTER:
      return {
        stack: [state.stack[0] || '0', ...state.stack],
        inputState: 'replace',
      };
    case OPERATION:
      return {
        stack: [`${doOperation(state.stack[0], state.stack[1], payload)}`, ...state.stack.slice(2)],
        inputState: 'push',
      };
    default:
      return state;
  }
};
