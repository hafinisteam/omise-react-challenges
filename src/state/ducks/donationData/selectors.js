const path = 'donationData';

export const getMessage = (state) => state[path].message;
export const getDonation = (state) => state[path].donate;
export const getPayments = (state) => state[path].payments;
export const getCharities = (state) => state[path].charities;
