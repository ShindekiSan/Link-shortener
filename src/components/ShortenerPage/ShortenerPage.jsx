import React from 'react';
import ShortenerForm from './ShortenerForm';
import ShortenerNavigation from './ShortenerNavigation';

const ShortenerPage = function () {
	return (
		<div>
			<ShortenerNavigation />
			<ShortenerForm />
		</div>
	);
};

export default ShortenerPage;
