import React from "react";
import { animated } from "react-spring";
import { Radio, Popconfirm, Select } from "antd";
import styled from "styled-components";
import Proptypes from "prop-types";
import { UIButton } from "~/components/presentation/ui/button";
import { donateRange } from "~/configs";
import currencyData from "~/configs/currency.json";
import { mediaMax } from "~/utilities/layout";

const { Option } = Select;

export const OverlayWrapper = styled(animated.div)`
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
  ${mediaMax.xl`
		.intro {
			font-size: 16px;
			span {
				margin-bottom: 10px;
			}
		}
		span.ant-radio + * {
			font-size: 14px;
			font-weight: 400;
		}
	`}
`;

const OverlayUnit = props => {
  return (
    <div>
      <button className="close-button" onClick={props.onCloseOverlay}>
        x
      </button>
      <div className="intro">
        <span>Select the amount to donate</span>
        <Select
          defaultValue={props.currency}
          style={{ width: 170 }}
          onChange={props.onSelect}
        >
          {Object.keys(currencyData).map(k => (
            <Option value={currencyData[k].code} key={k}>
              {currencyData[k].name}
            </Option>
          ))}
        </Select>
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

const { func, string, number } = Proptypes;

OverlayUnit.defaultProps = {
  currency: "USD",
  value: donateRange[0],
  onCloseOverlay: () => {},
  onSelect: () => {},
  onChangeRadio: () => {},
  onPayDonation: () => {}
};

OverlayUnit.propTypes = {
  currency: string.isRequired,
  value: number.isRequired,
  onCloseOverlay: func.isRequired,
  onSelect: func.isRequired,
  onChangeRadio: func.isRequired,
  onPayDonation: func.isRequired
};

export default OverlayUnit;
