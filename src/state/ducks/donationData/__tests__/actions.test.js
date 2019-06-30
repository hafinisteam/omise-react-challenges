import * as actions from "../actions";
import * as types from "../types";

describe("donationData actions", () => {
  let baseActionObj = {
    body: {},
    withToken: false,
    async: true
  };
  //updateDonation
  it("updateDonation must return correct object action", () => {
    const amount = 1000;
    const expected = {
      type: types.UPDATE_TOTAL_DONATE,
      payload: { amount }
    };

    expect(actions.updateDonation(amount)).toEqual(expected);
  });

  //updatePayments
  it("updatePayments must return correct object action", () => {
    const payment = [{ id: 1, amount: 20 }, { id: 1, amount: 30 }];
    const expected = {
      type: types.UPDATE_PAYMENTS,
      payload: { payment }
    };

    expect(actions.updatePayments(payment)).toEqual(expected);
  });

  //updateMessage
  it("updateMessage must return correct object action", () => {
    const message = "Update message success";
    const expected = {
      type: types.UPDATE_MESSAGE,
      payload: { message }
    };

    expect(actions.updateMessage(message)).toEqual(expected);
  });

  //getPaymentList
  it("getPaymentList must return correct object action", () => {
    const expected = {
      type: types.LOAD_PAYMENT_LIST,
      meta: {
        ...baseActionObj,
        method: "get",
        path: "/payments"
      }
    };

    expect(actions.getPaymentList()).toEqual(expected);
  });

  //payDonation
  it("payDonation must return correct object action", () => {
    const expected = {
      type: types.PAY_DONATION,
      meta: {
        ...baseActionObj,
        method: "post",
        path: "/payments"
      }
    };

    expect(actions.payDonation()).toEqual(expected);
  });
});
