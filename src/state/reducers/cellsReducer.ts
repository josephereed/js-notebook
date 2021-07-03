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
  order: ['ofwgkta', 'ofwgktadgaf'],
  data: {
    ofwgkta: {
      id: 'ofwgkta',
      type: 'text',
      content:
        "# How to render JSX elements with React\n- Import React\n- Import ReactDOM\n\n- Create JSX in React Functional Component\n- Use ReactDOM's render method to render into root div :)",
    },
    ofwgktadgaf: {
      id: 'ofwgktadgaf',
      type: 'code',
      content:
        "import React from 'react';\nimport ReactDOM from 'react-dom';\nconst App = () => {\nreturn (\n<div\nstyle={{\nposition: 'relative',\nwidth: '700px',\nheight: '250px',\nbackgroundColor: '#B0DB7D',\n}}\n>\n<div\nstyle={{\nwidth: '35%',\nheight: '350px',\nperspective: '40px',\n}}\n>\n<div\nstyle={{\nposition: 'absolute',\nwidth: '42%',\nheight: '22%',\nbackground: 'lightYellow',\nborderRadius: '50%',\nborder: '1px solid gray',\ntop: '21%',\nleft: '100%',\n}}\n>\n<div\nstyle={{\nposition: 'absolute',\nwidth: '5px',\nheight: '5px',\nbackground: 'black',\nborderRadius: '50%',\ntop: '40%',\nleft: '20%',\n}}\n></div>\n<div\nstyle={{\nposition: 'absolute',\nwidth: '5px',\nheight: '5px',\nbackground: 'black',\nborderRadius: '50%',\ntop: '40%',\nleft: '68%',\n}}\n>\n<div\nstyle={{\nposition: 'relative',\nleft: '-500%',\nwidth: '7px',\nheight: '7px',\nborderRadius: '50%',\nborder: '2px solid',\nborderColor: 'transparent black black transparent',\ntransform: 'rotate(45deg)',\n}}\n></div>\n</div>\n</div>\n</div>\n</div>\n);\n};\nReactDOM.render(<App />, document.querySelector('#root'));\n",
    },
  },
};

const cellsReducer = produce(
  (state: CellState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.DELETE_CELL:
        delete state.data[action.payload];
        state.order = state.order.filter((id) => id !== action.payload);
        return;
      case ActionType.INSERT_CELL:
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

        return;
      case ActionType.MOVE_CELL:
        const { direction } = action.payload;
        const index = state.order.findIndex((id) => id === action.payload.id);
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex > state.order.length - 1 || targetIndex < 0) {
          return;
        }

        const oldValue = state.order[targetIndex];
        state.order[index] = '';
        state.order[targetIndex] = action.payload.id;
        state.order[index] = oldValue;
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
