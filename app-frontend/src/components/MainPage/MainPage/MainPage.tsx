import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import Footer from '../Footer';
import Header from '../Header/Header';
import LinkInput from '../../../containers/MainPage/LinkInputContainer/LinkInputContainer';
import { RootState } from '../../../store/reducers/root';

const MainPage:FC = function () {
  const { loading, error } = useSelector((state: RootState) => state.user);
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
