const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, resp, next) => { // eslint-disable-line
	if (req.method === 'OPTIONS') {
		return next();
	}

	try {
		const token = req.headers.authorization.split(' ')[1];

		if (!token) {
			return resp.status(401).json({ message: 'no authorization' });
		}

		const decoded = jwt.verify(token, config.get('jwtSecret'));

		req.user = decoded;

		next();
	} catch (e) {
		return resp.status(401).json({ message: 'no authorization' });
	}
};
