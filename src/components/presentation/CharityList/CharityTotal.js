import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Proptypes from 'prop-types';
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
    background: ${COLOR.pink};
  }
`;

const CharityTotal = ({ total }) => {
  return (
    <Wrapper>
      <TotalStyled>Total donation: {total}</TotalStyled>
    </Wrapper>
  );
};

CharityTotal.propTypes = {
  total: Proptypes.number.isRequired
} 

export default connect(state => ({
  total: donationDataSelector.getDonation(state)
}))(CharityTotal);
