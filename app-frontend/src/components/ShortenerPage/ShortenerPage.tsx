import React, { FC } from 'react';
import ShortenerForm from '../../containers/ShortenerPage/ShortenerFormContainer';
import ShortenerNavigation from '../../containers/ShortenerPage/ShortenerNavigationContainer';

const ShortenerPage:FC = function () {
  return (
    <div>
      <ShortenerNavigation />
      <ShortenerForm />
    </div>
  );
};

export default ShortenerPage;
