import { useReducer } from 'react';
import produce from 'immer';

const initState = {
	data: [],
	loading: false
};

const reducer = produce((draft, action) => {
	switch (action.type) {
		case 'load_list':
			draft.loading = true;
			return;
		case 'load_success':
			draft.loading = false;
			draft.data = action.data;
			return;
		case 'load_fail':
			draft.loading = false;
			return;
		default:
			return;
	}
});
/**
 * Mini reducer with data and loading state
 * Dynamic naming returned reducer and update state function
 * @param  {string} reducerName Name of returned reducer data
 * @param  {string} loadListFunc Name of load list function
 * @param  {string} loadSuccessFunc Name of load success function
 * @param  {string} loadFailFunc Name of load fail function
 *
 * @return {object} An object with named reducer and functions
 */

const useMiniReducer = (
	reducerName = 'reducerData',
	loadListFunc = 'loadList',
	loadSuccessFunc = 'loadSuccess',
	loadFailFunc = 'loadFail'
) => {
	const [reducerData, action] = useReducer(reducer, initState);

	function loadList() {
		return action({ type: 'load_list' });
	}

	function loadSuccess(data) {
		return action({ type: 'load_success', data });
	}

	function loadFail() {
		return action({ type: 'load_fail' });
	}

	return {
		[reducerName]: reducerData,
		[loadListFunc]: loadList,
		[loadSuccessFunc]: loadSuccess,
		[loadFailFunc]: loadFail
	};
};

export default useMiniReducer;
