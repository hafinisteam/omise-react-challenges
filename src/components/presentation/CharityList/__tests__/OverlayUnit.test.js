import "jest-styled-components";
import renderer from "react-test-renderer";
import OverlayUnit from "../OverlayUnit";
import sinon from "sinon";

describe("<OverlayUnit />", () => {
  it("should render correctly", () => {
    const tree = renderer.create(<OverlayUnit />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("close button should call click events", () => {
    const onButonClick = sinon.spy();
    const wrapper = shallow(<OverlayUnit onCloseOverlay={onButonClick} />);
    wrapper.find("button.close-button").simulate("click");
    expect(onButonClick).toHaveProperty("callCount", 1);
  });
});
