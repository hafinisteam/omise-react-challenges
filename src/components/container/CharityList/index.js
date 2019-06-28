import React, { useEffect } from 'react';
import { compose } from 'recompose';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useTransition, animated } from 'react-spring';

import { getCharityList } from '~/state/ducks/actions/charityPayment';
import { message, Spin } from 'antd';
import { donationDataAction } from '~/state/ducks/donationData';
import { summaryDonations } from '~/helpers';
import useMiniReducer from '~/components/container/enhancers/useMiniReducer';
import CharityItem from './CharityItem';

const Wrapper = styled.div`
	margin-top: 30px;
`;

const Item = styled(animated.div)`
	margin-bottom: 50px;
	will-change: opacity, transform;
`;

const LoadingWrapper = styled.div`
	text-align: center;
	padding: 40px;
`;

const CharityList = props => {
	const {
		getCharityList,
		getPaymentList,
		updateDonation,
	} = props;

	const { reducerData, loadList, loadSuccess, loadFail } = useMiniReducer();

	const { data, loading } = reducerData;

	const transitions = useTransition(data, item => item.id, {
		from: { o: 0, y: 20 },
		enter: { o: 1, y: 0 },
		leave: { o: 0, y: 0 },
		trail: 200
	});

	// fetch charity list and payment
	useEffect(() => {
		loadList();
		try {
			const getList = async () => {
				const charityList = await getCharityList();
				const paymentList = await getPaymentList();
				loadSuccess(charityList);

				//Update donation amount on success
				const donationAmount = summaryDonations(paymentList);
				updateDonation(donationAmount);
			};
			getList();
		} catch (err) {
			loadFail();
			message.error('Error get charity list');
		}
	}, []);

	if (loading) {
		return (
			<LoadingWrapper>
				<Spin size="large" />
			</LoadingWrapper>
		);
	}

	return (
		<Wrapper className="row">
			{transitions.map(({ item, key, props: aniProps }) => (
				<Item
					className="col-12 col-sm-6"
					key={key}
					style={{
						opacity: aniProps.o,
						transform: aniProps.y.interpolate(y => `translate3d(0, ${y}px, 0)`)
					}}
				>
					<CharityItem charity={item} />
				</Item>
			))}
		</Wrapper>
	);
};

const { updateDonation, getPaymentList } = donationDataAction;

export default compose(
	connect(
		null,
		{
			getCharityList,
			getPaymentList,
			updateDonation
		}
	)
)(CharityList);
