import { summaryDonations } from "../helpers";

describe("helpers", function() {
  const donations = [
    { id: 1, amount: 10 },
    { id: 2, amount: 20 },
    { id: 3, amount: 30 }
  ];
  test("`summaryDonations` should calculate donations correctly", function() {
    expect(summaryDonations(donations)).toEqual(60);
  });
});
