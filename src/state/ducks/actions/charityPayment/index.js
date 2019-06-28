
import * as types from './types';
import apiAction from '~/state/ducks/utils/createAction';

export const getCharityList = () =>
	apiAction("get")(types.LOAD_CHARITY_LIST, '/charities');  
