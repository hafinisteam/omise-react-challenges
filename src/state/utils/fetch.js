import isomorphicFetch from 'isomorphic-fetch';

const fetch = (url, method, body) => {
	let options = {
		method: method ? method : 'get'
	};

	//Fix for Edge cannot have body in options
	if (method !== 'get') {
		options = {
			...options,
			body: JSON.stringify(body),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		};
	}

	return isomorphicFetch(url, options).then(res => {
		return parseStatus(res.json());
	});
};

function parseStatus(response) {
	return new Promise((resolve, reject) => {
		response
			.then(res => {
				return resolve(res);
			})
			.catch(err => {
				return reject(err);
			});
	});
}

export default fetch;
