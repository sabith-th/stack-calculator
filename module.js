const PRESS_NUM = 'PRESS_NUM';
const ENTER = 'ENTER';
const OPERATION = 'OPERATION';
const CLEAR = 'CLEAR';
const SWAP = 'SWAP';
const TOGGLE_NEGATIVE = 'TOGGLE_NEGATIVE';

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

export const clear = () => ({
  type: CLEAR,
});

export const swap = () => ({
  type: SWAP,
});

export const toggleNegative = index => ({
  type: TOGGLE_NEGATIVE,
  payload: index,
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

const switchNegative = (x) => {
  if (x.startsWith('-')) {
    return x.slice(1);
  }
  return `-${x}`;
};

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
    case CLEAR:
      return initialState;
    case SWAP:
      return {
        stack: [state.stack[1], state.stack[0], ...state.stack.slice(2)],
        inputState: 'push',
      };
    case TOGGLE_NEGATIVE:
      return {
        stack: state.stack.map((x, i) => (payload === i ? switchNegative(x) : x)),
        inputState: state.inputState,
      };
    default:
      return state;
  }
};
