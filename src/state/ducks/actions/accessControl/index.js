
import * as types from './types';
import apiAction from '~/state/ducks/utils/createAction';

export const getAccessRoleList = () =>
	apiAction("get")(types.LOAD_ACCESS_ROLE_LIST, '/admin/r/role', {}, true);  

export const createAccessRole = (body) =>
	apiAction("post")(types.CREATE_ACCESS_ROLE, '/admin/w/role', body, true);        

export const editAccessRole = (body) =>
	apiAction("put")(types.EDIT_ACCESS_ROLE, '/admin/w/role', body, true);        

export const deleteAccessRole = (id) =>
	apiAction("delete")(types.DELETE_ACCESS_ROLE, `${'/admin/w/role'}/${id}`, {}, true);       
	
export const getRolePermissionById = (id) =>
	apiAction("get")(types.LOAD_ROLE_PERMISSION_BY_ID, '/admin/r/permission/role/' + id, {}, true);  
	
export const updateRolePermission = (body) =>
	apiAction("put")(types.UPDATE_ROLE_PERMISSION, '/admin/w/permissions', body, true);  
	
export const deleteRolePermission = (id) =>
	apiAction("delete")(types.DELETE_ROLE_PERMISSION, '/admin/w/function/' + id, {}, true);  
