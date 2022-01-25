import React, { FC } from 'react';
import Footer from './Footer';
import Header from './Header';
import LinkInput from '../../containers/MainPage/LinkInputContainer';

const MainPage:FC = function () {
  return (
    <main>
      <Header />
      <LinkInput />
      <Footer />
    </main>
  );
};

export default MainPage;
