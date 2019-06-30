import * as selectors from "../selectors";

describe("donationData selectors", () => {
  let state;
  beforeEach(() => {
    state = {
      donationData: {
        donate: 0,
        message: "",
        payments: [],
        charities: []
      }
    };
  });
  it("should select the `message` state", () => {
    expect(selectors.getMessage(state)).toEqual("");
  });
  it("should select the `donate` state", () => {
    expect(selectors.getDonation(state)).toEqual(0);
  });
  it("should select the `payments` state", () => {
    expect(selectors.getPayments(state)).toEqual([]);
  });
  it("should select the `charities` state", () => {
    expect(selectors.getCharities(state)).toEqual([]);
  });
});
