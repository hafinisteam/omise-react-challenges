import React, { useEffect } from 'react';
import { compose } from 'recompose';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
	getCharityList,
	getPaymentList
} from '~/state/ducks/actions/charityPayment';
import { donationDataAction } from '~/state/ducks/donationData';
import { UIButton } from '~/components/presentation/ui/button';
import { message, Spin } from 'antd';
import { summaryDonations } from '~/helpers';
import UICard from '~/components/presentation/ui/commons/UICard';
import useMiniReducer from '~/components/container/enhancers/useMiniReducer';

const Wrapper = styled.div`
	margin-top: 50px;
`;

const Item = styled.div`
	margin-bottom: 50px;
`;

const LoadingWrapper = styled.div`
	text-align: center;
	padding: 40px;
`;

const CharityList = props => {
	const { getCharityList, getPaymentList, updateDonation } = props;

	const { reducerData, loadList, loadSuccess, loadFail } = useMiniReducer();

	const { data, loading } = reducerData;

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
			{data.map(charity => (
				<Item className="col-12 col-sm-6" key={charity.id}>
					<UICard
						image={`/images/${charity.image}`}
						title={charity.name}
						extraTitle={<UIButton>Donate</UIButton>}
					/>
				</Item>
			))}
		</Wrapper>
	);
};

export default compose(
	connect(
		null,
		{
			getCharityList,
			getPaymentList,
			updateDonation: donationDataAction.updateDonation
		}
	)
)(CharityList);
