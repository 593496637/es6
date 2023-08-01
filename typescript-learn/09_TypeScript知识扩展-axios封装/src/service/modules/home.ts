import request from '..';

request
	.request({
		url: '/home/multidata',
		method: 'GET',
	})
	.then((res) => {
		console.log(res.data);
	});
