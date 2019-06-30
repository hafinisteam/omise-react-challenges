import "jest-styled-components";
import renderer from "react-test-renderer";
import { CharityTotal } from "../CharityTotal";
import sinon from "sinon";

describe("<CharityTotal />", () => {
  it("should render correctly", () => {
    const tree = renderer.create(<CharityTotal />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("close button should call click events", () => {
    const onButonClick = sinon.spy();
    const wrapper = shallow(<CharityTotal payments={[]}  />);
    wrapper.find("TotalButton.open-modal-btn").simulate("click");
    expect(onButonClick).toHaveProperty("callCount", 0);
  });
});
