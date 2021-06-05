import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';
import { produce } from 'immer';
import uniqid from 'uniqid';

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellsReducer = produce(
  (state: CellState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.DELETE_CELL:
        delete state.data[action.payload];
        state.order = state.order.filter((id) => id !== action.payload);
        return;
      case ActionType.INSERT_CELL:
        // if payload.id exists insert before
        const cell: Cell = {
          content: '',
          type: action.payload.type,
          id: uniqid.time(),
        };

        if (action.payload.id === null) {
          state.order.push(cell.id);
          state.data[cell.id] = cell;
        }
        if (action.payload.id) {
          const targetIndex = state.order.findIndex(
            (id) => id === action.payload.id
          );
          state.order.splice(targetIndex, 0, cell.id);
          state.data[cell.id] = cell;
        }

        // if payload.id == null insert after last element
        // add to data object depending on cell typee
        return;
      case ActionType.MOVE_CELL:
        const { direction } = action.payload;
        const index = state.order.findIndex((id) => id === action.payload.id);
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex > state.order.length - 1 || targetIndex < 0) {
          return;
        }
        state.order[targetIndex] = action.payload.id;
        state.order[index] = state.order[targetIndex];
        return;
      case ActionType.UPDATE_CELL:
        const { id } = action.payload;
        const { content } = action.payload;
        state.data[id].content = content;
        return;
      default:
        return;
    }
  },
  initialState
);

export default cellsReducer;
