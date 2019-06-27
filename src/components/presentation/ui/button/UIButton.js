import styled from "styled-components";
import COLOR from "~/utilities/layout/color";

const UIButton = styled.button`
  border: 1px solid ${COLOR.blue};
  border-radius: 3px;
  background: white;
  color: ${COLOR.blue};
  font-size: 16px;
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
  &:hover {
    color: white;
    background: ${COLOR.blue};
  }
`;

export default UIButton;
