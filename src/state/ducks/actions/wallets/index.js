import apiAction from "~/state/ducks/utils/createAction";
import * as types from "./types";
import { parseObjToQuery } from "~/views/utilities/helpers";
import { transactionType } from "~/configs";

export const getWalletTransactionList = query =>
  apiAction("get")(
    types.LOAD_WALLET_TRANSACTION_LIST,
    "/admin/transfer_request" + parseObjToQuery(query),
    {},
    true
  );

export const getWalletTransactionDetail = id =>
  apiAction("get")(
    types.LOAD_WALLET_TRANSACTION_LIST,
    "/admin/transfer_request/" + id,
    {},
    true
  );

export const getWalletTransactionHistory = query =>
  apiAction("get")(
    types.LOAD_WALLET_TRANSACTION_HISTORY,
    "/admin/transaction" + parseObjToQuery(query),
    {},
    true
  );

export const getWalletTransactionType = () =>
  apiAction("get")(
    types.LOAD_WALLET_TRANSACTION_TYPE,
    "/transaction/type",
    {},
    true
  );

export const getSaleWalletList = query =>
  apiAction("get")(
    types.LOAD_SALE_WALLET_LIST,
    "/admin/sale" + parseObjToQuery(query),
    {},
    true
  );

export const getSaleWalletTransaction = (id, query) =>
  apiAction("get")(
    types.LOAD_SALE_TRANSACTION_LIST,
    `/admin/wallet/${id}/transaction${parseObjToQuery(query)}`,
    {},
    true
  );

export const getWalletTransactionDirectList = (query) => 
  apiAction("get")(
    types.LOAD_WALLET_TRANSACTION_DIRECT_LIST,
    `/admin/list_deposit_withdraw${parseObjToQuery(query)}`,
    {},
    true
  )

export const rechargeMoney = data =>
  apiAction("post")(types.RECHARGE_MONEY, "/admin/deposit_money", data, true);

export const withDrawMoney = data =>
  apiAction("post")(
    types.WITHDRAWAL_MONEY,
    "/admin/withdraw_money",
    data,
    true
  );

export const approveTransaction = (type, data) => {
  const url =
    type === transactionType.RECHARGE
      ? "/admin/approval_deposit"
      : "/admin/approval_withdraw";
  return apiAction("post")(types.APPROVE_TRANSACTION, url, data, true);
};

export const rejectTransaction = (type, data) => {
  const url =
    type === transactionType.RECHARGE
      ? "/admin/reject_deposit"
      : "/admin/reject_withdraw";
  return apiAction("post")(types.REJECT_TRANSACTION, url, data, true);
};

// wallet list
export const getWalletList = query =>
  apiAction("get")(
    types.LOAD_WALLET_LIST,
    "/admin/r/manager_wallet" + parseObjToQuery(query),
    {},
    true
  );
export const blockWallet = data =>
  apiAction("post")(
    types.BLOCK_WALLET,
    "/admin/user_block_buying",
    data,
    true
  );

export const updateTransactionDirect = (data) => 
  apiAction("put")(
    types.UPDATE_TRANSACTION_DIRECT,
    "/admin/change_status",
    data,
    true
  );