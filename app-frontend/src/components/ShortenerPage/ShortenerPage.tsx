import React, { FC } from 'react';
import ShortenerForm from '../../containers/ShortenerPage/ShortenerFormContainer/ShortenerFormContainer';
import ShortenerNavigation from '../../containers/ShortenerPage/ShortenerNavigation/ShortenerNavigationContainer';

const ShortenerPage:FC = function () {
  return (
    <div>
      <ShortenerNavigation />
      <ShortenerForm />
    </div>
  );
};

export default ShortenerPage;
