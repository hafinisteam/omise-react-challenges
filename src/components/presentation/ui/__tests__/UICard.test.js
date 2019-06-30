// import { expect } from "chai";
import UICard from "../commons/UICard";
import "jest-styled-components";
import renderer from "react-test-renderer";

describe("<UICard />", () => {
  it("should render a CardBody with default props", () => {
    const wrapper = shallow(<UICard />);
    expect(wrapper.find("CardBody")).toHaveLength(1);
  });

  it("should render title correctly", () => {
    const wrapper = shallow(<UICard title="Test title" />);
    expect(wrapper.find(".card-title").text()).toEqual("Test title");
  });

  it("should render image when receive image props", () => {
    const wrapper = shallow(<UICard image="Test title" />);
    expect(wrapper.find("CardMedia")).toHaveLength(1);
  });

  it("render correctly with props", () => {
    const props = {
      title: "Ha Nguyen",
      image: "https://via.placeholder.com/350x150",
      extraTitle: <p>Extra</p>
    };
    const tree = renderer.create(<UICard {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
