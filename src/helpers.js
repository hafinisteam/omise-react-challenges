import has from 'has';

export const summaryDonations = donations =>
	donations.reduce((acc, donate) => {
		if (has(donate, 'amount')) {
			return acc + donate.amount;
		} else {
      return acc
    }
	}, 0);
