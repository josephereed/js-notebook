import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { ActionType } from './action-types';

export const store = createStore(reducers, {}, applyMiddleware(thunk));

store.dispatch({
  type: ActionType.INSERT_CELL,
  payload: { id: null, type: 'text' },
});

const firstItem = [Object.keys(store.getState().cells.data)[0]];

store.dispatch({
  type: ActionType.UPDATE_CELL,
  payload: { id: firstItem[0], content: 'asdfasefsdf' },
});

console.log(store.getState());
