import apiAction, { defaultAction } from "../createAction";

describe("createAction utils", () => {
  it("apiAction function should return correct action object with default params", () => {
    const expected = {
      type: "action",
      meta: {
        body: {},
        method: "post",
        async: true,
        withToken: true,
        path: "/api/url"
      }
    };
    expect(apiAction("post")("action", "/api/url", {}, true)).toEqual(expected);
  });

  it("default function should return correct action object", () => {
    const expected = {
      type: "action",
      payload: null
    };
    expect(defaultAction("action", null)).toEqual(expected);
  });
});
