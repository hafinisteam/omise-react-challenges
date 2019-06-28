import { compose, withHandlers, withState } from 'recompose';
import { connect } from 'react-redux';
import { message } from 'antd';
import uuidv1 from 'uuid/v1';
import { donationDataAction } from '~/state/ducks/donationData';
import { donateRange } from '~/configs';
import currencyData from '~/configs/currency.json';

const { updateDonation, payDonation } = donationDataAction;

export default compose(
	connect(
		null,
		{
			payDonation,
			updateDonation
		}
	),
	withState('amount', 'setAmount', donateRange[0]),
	withState('currency', 'setCurrency', Object.keys(currencyData)[0]),
	withHandlers({
		handlePay: props => () => {
			const { payDonation, updateDonation, charity, amount, currency } = props;
			const body = { charitiesId: charity.id, amount, currency, id: uuidv1() };

			payDonation(body)
				.then(() => {
					message.success('Paying donation successfully');
					updateDonation(amount);
				})
				.catch(() => {
					message.error('Paying error');
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
);
