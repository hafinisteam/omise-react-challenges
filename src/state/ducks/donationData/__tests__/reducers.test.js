import reducer from "../reducers";
import produce from "immer";

import * as types from "../types";
import * as actions from "../actions";
import { LOAD_CHARITY_LIST_SUCCESS } from "../../actions/charityPayment/types";

describe("donationData reducers", () => {
  let state;
  beforeEach(() => {
    state = {
      donate: 0,
      message: "",
      payments: [],
      charities: []
    };
  });

  it("should return the correct initial state'", () => {
    expect(reducer(undefined, {})).toEqual(state);
  });

  it("should handle the updateDonation action correctly", () => {
    const fixture = 50;
    const expectedResult = produce(state, draft => {
      draft.donate = fixture;
    });

    expect(reducer(state, actions.updateDonation(fixture))).toEqual(
      expectedResult
    );
  });

  it("should handle the updateMessage action correctly", () => {
    const fixture = "Update donation";
    const expectedResult = produce(state, draft => {
      draft.message = fixture;
    });

    expect(reducer(state, actions.updateMessage(fixture))).toEqual(
      expectedResult
    );
  });

  it("should handle the updatePayments action correctly", () => {
    const fixture = [{ id: 1, amount: 20 }, { id: 2, amount: 30 }];
    const expectedResult = produce(state, draft => {
      draft.payments.push(fixture);
    });

    expect(reducer(state, actions.updatePayments(fixture))).toEqual(
      expectedResult
    );
  });

  it("should handle the LOAD_PAYMENT_LIST_SUCCESS action correctly", () => {
    const fixture = [{ id: 1, amount: 20 }, { id: 2, amount: 30 }];
    const action = { type: types.LOAD_PAYMENT_LIST_SUCCESS, payload: fixture };
    const expectedResult = produce(state, draft => {
      draft.payments = fixture;
    });

    expect(reducer(state, action)).toEqual(expectedResult);
  });

  it("should handle the LOAD_CHARITY_LIST_SUCCESS action correctly", () => {
    const fixture = [{ id: 1, name: 'A' }, { id: 2, amount: 'B' }];
    const action = { type: LOAD_CHARITY_LIST_SUCCESS, payload: fixture };
    const expectedResult = produce(state, draft => {
      draft.charities = fixture;
    });

    expect(reducer(state, action)).toEqual(expectedResult);
  });
});
