import React, { useState } from "react";
import { compose, withHandlers, withState } from "recompose";
import { connect } from "react-redux";
import { useTransition, animated } from "react-spring";
import { Radio, message, Popconfirm } from "antd";
import styled from "styled-components";
import uuidv1 from "uuid/v1";
import { payDonation } from "~/state/ducks/actions/charityPayment";
import { donationDataAction } from "~/state/ducks/donationData";
import { UIButton } from "~/components/presentation/ui/button";
import UICard from "~/components/presentation/ui/commons/UICard";
import { donateRange } from "~/configs";
import currencyData from "~/configs/currency.json";

const OverWrapper = styled(animated.div)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.9);
  text-align: center;
  .close-button {
    font-size: 18px;
    font-weight: 700;
    position: absolute;
    right: 10px;
    top: 10px;
    border: none;
    background: transparent;
    cursor: pointer;
  }
  .intro {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 15px;
    span {
      display: inline-block;
      margin-right: 10px;
    }
  }
  .range {
    margin-bottom: 20px;
  }
  span.ant-radio + * {
    font-size: 16px;
    font-weight: 700;
  }
`;

const OverlayUnit = props => {
  return (
    <div>
      <button className="close-button" onClick={props.onCloseOverlay}>
        x
      </button>
      <div className="intro">
        <span>Select the amount to donate (USD)</span>
        {/* <Select
          defaultValue={props.currency}
          style={{ width: 170 }}
          onChange={props.onSelect}
        >
          {Object.keys(currencyData).map(k => (
            <Option value={currencyData[k].code} key={k}>
              {currencyData[k].name}
            </Option>
          ))}
        </Select> */}
      </div>
      <div className="range">
        <Radio.Group onChange={props.onChangeRadio} value={props.value}>
          {donateRange.map(d => (
            <Radio value={d} key={d}>
              {d}
            </Radio>
          ))}
        </Radio.Group>
      </div>
      <Popconfirm
        title="Are you sure ?"
        onConfirm={props.onPayDonation}
        okText="Yes"
        cancelText="No"
      >
        <UIButton>Pay</UIButton>
      </Popconfirm>
    </div>
  );
};

const CharityItem = props => {
  const { charity, handlePay, handleRadio, handleSelect, handleReset } = props;
  const { amount, currency } = props;

  const [showOverlay, setOverlay] = useState(false);

  const transition = useTransition(showOverlay, null, {
    from: { o: 0, scale: 1.1 },
    enter: { o: 1, scale: 1 },
    leave: { o: 0, scale: 1.1 }
  });

  function closeOverlay() {
    setOverlay(false);
    handleReset();
  }

  function payDonation() {
    setOverlay(false);
    handlePay();
  }

  return (
    <UICard
      image={`/images/${charity.image}`}
      title={charity.name}
      extraTitle={<UIButton onClick={() => setOverlay(true)}>Donate</UIButton>}
      overlay={() =>
        transition.map(
          ({ item, props: aniProps, key }) =>
            item && (
              <OverWrapper
                key={key}
                style={{
                  opacity: aniProps.o,
                  transform: aniProps.scale.interpolate(s => `scale(${s})`)
                }}
              >
                <OverlayUnit
                  value={amount}
                  currency={currency}
                  onChangeRadio={handleRadio}
                  onSelect={handleSelect}
                  onCloseOverlay={closeOverlay}
                  onPayDonation={payDonation}
                />
              </OverWrapper>
            )
        )
      }
    />
  );
};

export default compose(
  connect(
    null,
    {
      payDonation,
      updateDonation: donationDataAction.updateDonation
    }
  ),
  withState("amount", "setAmount", donateRange[0]),
  withState("currency", "setCurrency", Object.keys(currencyData)[0]),
  withHandlers({
    handlePay: props => () => {
      const { payDonation, updateDonation, charity, amount, currency } = props;
      const body = { charitiesId: charity.id, amount, currency, id: uuidv1() };

      payDonation(body)
        .then(() => {
          message.success("Paying donation successfully");
          updateDonation(amount);
        })
        .catch(() => {
          message.error("Paying error");
        });
    },
    handleRadio: props => e => {
      props.setAmount(e.target.value);
    },
    handleSelect: props => val => {
      props.setCurrency(val);
    },
    handleReset: props => () => {
      props.setAmount(donateRange[0]);
      props.setCurrency(Object.keys(currencyData)[0]);
    }
  })
)(CharityItem);
