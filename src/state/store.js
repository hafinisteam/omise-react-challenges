import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createLogger } from 'redux-logger';

import { apiService } from "./middlewares";
import * as reducers from './ducks';

export const isDevEnv = process.env.NODE_ENV === 'development'

const configStore = () => {
	const middlewares = [apiService];
	const rootReducers = combineReducers(reducers);

	// only log action in dev mode
	if(isDevEnv) {
		middlewares.push(createLogger());
	}

	const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	const store = createStore(
		rootReducers, 
		composeEnhancer(applyMiddleware(...middlewares))
	);
	return store;
};

const store = configStore();

export default store;