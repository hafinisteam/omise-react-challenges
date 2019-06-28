import * as types from './types';
import apiAction, { defaultAction } from '../utils/createAction';

export const updateDonation = amount =>
	defaultAction(types.UPDATE_TOTAL_DONATE, { amount });

export const updateMessage = message =>
	defaultAction(types.UPDATE_MESSAGE, { message });

export const getPaymentList = () =>
	apiAction('get')(types.LOAD_PAYMENT_LIST, '/payments');

export const payDonation = body =>
	apiAction('post')(types.PAY_DONATION, '/payments', body);
