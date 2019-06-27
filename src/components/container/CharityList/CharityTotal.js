import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { UIButton } from "~/components/presentation/ui/button";
import COLOR from "~/utilities/layout/color";
import { donationDataSelector } from "~/state/ducks/donationData";

const Wrapper = styled.div`
  text-align: right;
`;

const TotalStyled = styled(UIButton)`
  border-color: ${COLOR.pink};
  color: ${COLOR.pink};
  cursor: default;
  &:hover {
    background: ${COLOR.white};
    color: ${COLOR.pink};
  }
`;

const CharityTotal = ({ total }) => {
  return (
    <Wrapper>
      <TotalStyled as="span">Total donation: {total} $</TotalStyled>
    </Wrapper>
  );
};

export default connect(state => ({
  total: donationDataSelector.getDonation(state)
}))(CharityTotal);
