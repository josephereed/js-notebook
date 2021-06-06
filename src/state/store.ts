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
store.dispatch({
  type: ActionType.INSERT_CELL,
  payload: { id: null, type: 'code' },
});

store.dispatch({
  type: ActionType.INSERT_CELL,
  payload: { id: null, type: 'text' },
});

export type RootState = ReturnType<typeof store.getState>;
