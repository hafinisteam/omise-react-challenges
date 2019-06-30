import UIButton from "../button/UIButton";

import { render } from "@testing-library/react";

describe("<UIButton />", () => {
  it("should render an <button> tag", () => {
    const { container } = render(<UIButton />);
    expect(container.querySelector("button")).not.toBeNull();
  });
  
  it('should have a class attribute', () => {
    const { container } = render(<UIButton />);
    expect(container.querySelector('button').hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(<UIButton id={id} />);
    expect(container.querySelector('button').id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<UIButton attribute="test" />);
    expect(container.querySelector('button[attribute="test"]')).toBeNull();
  });
});
