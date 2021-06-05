import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { ActionType } from './action-types';

export const store = createStore(reducers, {}, applyMiddleware(thunk));

// clean this up
store.dispatch({
  type: ActionType.INSERT_CELL,
  payload: { id: null, type: 'text' },
});

const firstItem = [Object.keys(store.getState().cells.data)[0]];

store.dispatch({
  type: ActionType.UPDATE_CELL,
  payload: { id: firstItem[0], content: 'asdfasefsdf' },
});

store.dispatch({
  type: ActionType.INSERT_CELL,
  payload: { id: null, type: 'code' },
});

console.log(store.getState());

export type RootState = ReturnType<typeof store.getState>;
