import React, { useState } from 'react';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { useSpring, animated } from 'react-spring';
import { Radio, Select } from 'antd';
import styled from 'styled-components';
import { payDonation } from '~/state/ducks/actions/charityPayment';
import { donationDataAction } from '~/state/ducks/donationData';
import { UIButton } from '~/components/presentation/ui/button';
import UICard from '~/components/presentation/ui/commons/UICard';
import { donateRange } from '~/configs';
import currencyData from '~/configs/currency.json';

const { Option } = Select;

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
	.intro {
		font-size: 18px;
		font-weight: 700;
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

const OverlayUnit = props => (
	<OverWrapper>
		<p className="intro">
			<span>Select the amount to donate</span>
			<Select
				defaultValue={props.currency}
				style={{ width: 170 }}
        onChange={props.onSelect}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        showSearch
			>
				{Object.keys(currencyData).map(k => (
					<Option value={currencyData[k].code} key={k}>
						{currencyData[k].name}
					</Option>
				))}
			</Select>
		</p>
		<p className="range">
			<Radio.Group onChange={props.onChange} value={props.value}>
				{donateRange.map(d => (
					<Radio value={d} key={d}>
						{d}
					</Radio>
				))}
			</Radio.Group>
		</p>
		<UIButton>Pay</UIButton>
	</OverWrapper>
);

const CharityItem = props => {
	const { charity, handlePay } = props;

	const [showOverlay, setOverlay] = useState(false);

	const [radio, setRadio] = useState(donateRange[0]);
  const [currency, setCurrency] = useState(Object.keys(currencyData)[0]);
  const [anime, setAnime] = useSpring(() => ({

  }))

	function handleRadio(e) {
		setRadio(e.target.value);
	}

	function handleSelect(val) {
		setCurrency(val);
	}

	return (
		<UICard
			image={`/images/${charity.image}`}
			title={charity.name}
			extraTitle={<UIButton onClick={handlePay}>Donate</UIButton>}
			overlay={
				<OverlayUnit
					value={radio}
					currency={currency}
					onChange={handleRadio}
					onSelect={handleSelect}
				/>
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
	withHandlers({
		handlePay: props => () => {
			const { payDonation } = props;
			const body = { charitiesId: 99, amount: 200, currency: 'ETH' };

			payDonation(body)
				.then(res => {
					console.log(res);
				})
				.catch(err => {
					console.log(err);
				});
		}
	})
)(CharityItem);
