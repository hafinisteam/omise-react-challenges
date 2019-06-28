import * as types from './types';
import produce from 'immer';

const initialState = {
	donate: 0,
	message: '',
	payments: []
};

const reducer = produce((draft, { payload, type }) => {
	switch (type) {
		case types.UPDATE_TOTAL_DONATE:
			draft.donate = draft.donate + payload.amount;
			return;
		case types.LOAD_PAYMENT_LIST_SUCCESS:
			draft.payments = payload.payments;
			return;
		case types.UPDATE_MESSAGE:
			draft.message = payload.message;
			break;
		default:
			return draft;
	}
}, initialState);

export default reducer;
