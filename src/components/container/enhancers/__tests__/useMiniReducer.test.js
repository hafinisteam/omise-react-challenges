import { renderHook, act } from "@testing-library/react-hooks";
import useMiniReducer from "../useMiniReducer";

describe("useMiniReducer", () => {
  let state;
  let miniReducer;
  beforeEach(() => {
    state = {
      data: [],
      loading: false
    };

    miniReducer = renderHook(() => useMiniReducer()).result;
  });
  
  it("should return correct initial state", () => {
    const { result } = renderHook(() => useMiniReducer());

    expect(result.current.reducerData).toEqual(state);
  });

  it("should return correct object with input params", () => {
    const { result } = renderHook(() =>
      useMiniReducer("data", "loadData", "loadSuccess", "loadFail")
    );
    const { data, loadData, loadSuccess, loadFail } = result.current;
    expect(result.current).toEqual({
      data,
      loadData,
      loadSuccess,
      loadFail
    });
  });

  it("should handle load action correctly", () => {
    act(() => {
      miniReducer.current.loadList();
    });
    const { reducerData } = miniReducer.current;
    expect(reducerData.loading).toBe(true);
  });

  it("should handle success action correctly", () => {
    const fixture = [{ id: 1, amount: 20 }];
    act(() => {
      miniReducer.current.loadSuccess(fixture);
    });
    const { reducerData } = miniReducer.current;
    expect(reducerData.data).toEqual(fixture);
  });

  it("should handle success action correctly", () => {
    act(() => {
      miniReducer.current.loadFail();
    });
    const { reducerData } = miniReducer.current;
    expect(reducerData.loading).toBe(false);
  });
});
