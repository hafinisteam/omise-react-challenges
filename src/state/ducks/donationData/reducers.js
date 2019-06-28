import produce from 'immer';
import * as types from './types';
import { LOAD_CHARITY_LIST_SUCCESS } from '../actions/charityPayment/types';

const initialState = {
	donate: 0,
	message: '',
	payments: [],
	charities: []
};

const reducer = produce((draft, { payload, type }) => {
	switch (type) {
		case types.UPDATE_TOTAL_DONATE:
			draft.donate = draft.donate + payload.amount;
			return;
		case types.LOAD_PAYMENT_LIST_SUCCESS:
			draft.payments = payload;
			return;
		case types.UPDATE_PAYMENTS:
			draft.payments.push(payload.payment);
			return;
		case types.UPDATE_MESSAGE:
			draft.message = payload.message;
			break;
		case LOAD_CHARITY_LIST_SUCCESS:
			draft.charities = payload;
			return;
		default:
			return draft;
	}
}, initialState);

export default reducer;
