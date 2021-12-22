import React, { FC } from 'react';
import Footer from './Footer';
import Header from './Header';
import LinkInput from '../../containers/MainPage/LinkInputContainer';
import useTypedSelector from '../../hooks/typedSelector.hook';

const MainPage:FC = function () {
  const { loading, error } = useTypedSelector((state) => state.user);
  return (
    <div>
      {loading
        ? (
          <h2 className="loader">Loading...</h2>
        ) : (
          <div>
            {error
              ? (
                <h2 className="error-loader">Error occured. Reload the page.</h2>
              ) : (
                <main>
                  <Header />
                  <LinkInput />
                  <Footer />
                </main>
              )}
          </div>
        )}
    </div>
  );
};

export default MainPage;
