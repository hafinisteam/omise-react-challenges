import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import { Scrollbars } from "react-custom-scrollbars";
import { UIButton } from "~/components/presentation/ui/button";
import COLOR from "~/utilities/layout/color";
import { donationDataSelector } from "~/state/ducks/donationData";
import { Modal, Empty, Tag } from "antd";

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

TotalStyled.displayName = 'TotalButton'

const PaymentItem = styled.div`
  border-bottom: 1px solid ${COLOR.gray};
	margin-bottom: 9px;
  padding-bottom: 10px;
	margin-right: 15px;
  &:first-child {
    margin-top: 10px;
  }
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  .name {
    font-size: 16px;
    color: ${COLOR.blue};
    margin-bottom: 0;
  }
  .info {
    b { 
			display: inline-block;
			margin-right: 5px;
		}
  }
`;

PaymentItem.displayName = 'PaymentItem';

const paymentsInfo = (payments, charities) => {
  Modal.info({
    title: "Donation payments list",
    content: payments.length ? (
      <Scrollbars style={{ height: 300, paddingRight: 20 }}>
        {payments.map(p => {
          const charity = charities.find(c => p.charitiesId === c.id);
          return (
            <PaymentItem key={p.id}>
              <p className="name">{charity.name}</p>
              <div className="info">
								<b>
									{p.amount}
								</b>
                <Tag color="geekblue">{p.currency}</Tag>
              </div>
            </PaymentItem>
          );
        })}
      </Scrollbars>
    ) : (
      <Empty />
    )
  });
};

export const CharityTotal = ({ total, payments, charities }) => {
  return (
    <Wrapper>
      <TotalStyled className='open-modal-btn' onClick={() => paymentsInfo(payments, charities)}>
        Total donation: {total}
      </TotalStyled>
    </Wrapper>
  );
};

CharityTotal.propTypes = {
  total: Proptypes.number.isRequired,
  payments: Proptypes.array,
  charities: Proptypes.array
};

CharityTotal.defaultProps = {
  total: 0
}

export default connect(state => ({
  total: donationDataSelector.getDonation(state),
  payments: donationDataSelector.getPayments(state),
  charities: donationDataSelector.getCharities(state)
}))(CharityTotal);
