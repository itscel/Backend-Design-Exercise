let requestsPerUser = [];

const rateLimiterMiddleware = (req, res, next) => {
    // const address = req.socket.remoteAddress;
    // const currentTime = new Date();
    // const filteredRequests = requestsPerUser.filter(request => {
    //     return request.address === address && request.time > new Date() - 60000
    // })
    // console.log('Filtered:', filteredRequests)
    // //Clean up old requests
    // requestsPerUser = requestsPerUser.filter(request => {
    //     return request.time > currentTime - 60000; // Filter requests
    // });

    // //Tracks the current request
    // requestsPerUser.push({ address, time: currentTime });

    // //Filtering requests from specific user
    // const userRequests = requestsPerUser.filter(request => request.address === address);

    // if (userRequests.length > 5) {
    //     return res.status(429).send('Too many requests');
    // }

    // next();


    const address = req.socket.remoteAddress
	requestsPerUser.push({
	  address,
	  time: new Date()
	})
	const filteredRequests = requestsPerUser.filter(request => {
	  return request.address === address && request.time > new Date() - 60000
	})
	console.log('Filtered:', filteredRequests)
	if (filteredRequests.length > 5) {
	  return res.send('Too many requests')
	} 
	next()
};

module.exports = rateLimiterMiddleware;
