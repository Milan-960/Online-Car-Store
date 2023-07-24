import { renderHook, act } from "@testing-library/react-hooks";
import useWindowSize from "../../hooks/useWindowSize";

describe("useWindowSize", () => {
  // Save original window properties and override them for the test
  const { resizeTo } = window;
  const size = {
    width: 1024,
    height: 768,
  };

  beforeAll(() => {
    // Override resizeTo and innerWidth/innerHeight
    window.innerWidth = size.width;
    window.innerHeight = size.height;
    window.resizeTo = function resizeTo(width, height) {
      Object.assign(this, {
        innerWidth: width,
        innerHeight: height,
      }).dispatchEvent(new this.Event("resize"));
    };
  });

  // Restore original window properties after the tests
  afterAll(() => {
    window.resizeTo = resizeTo;
  });

  it("should return current window size", () => {
    const { result } = renderHook(() => useWindowSize());

    expect(result.current).toEqual(size);
  });

  it("should update window size when resized", () => {
    const newSize = {
      width: 800,
      height: 600,
    };

    const { result } = renderHook(() => useWindowSize());

    act(() => {
      window.resizeTo(newSize.width, newSize.height);
    });

    expect(result.current).toEqual(newSize);
  });
});
