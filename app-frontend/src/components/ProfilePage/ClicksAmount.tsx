import React, {
  useEffect, useState, useCallback, FC,
} from 'react';

export interface LinkClicks {
  clicks: number
}

interface Props {
  links: LinkClicks[]
}

const ClicksAmount:FC<Props> = function ({ links }) {
  const [clicks, setClicks] = useState<number>(0);

  const getClicksNumber = useCallback(() => {
    setClicks(links.slice(0).reduce((total:number, link:LinkClicks) => total + link.clicks, 0));
  }, [links]);

  useEffect(() => {
    getClicksNumber();
  }, [getClicksNumber]);

  return (
    <p className="profile-links-clicks-amount">
      Amount of clicks on all your links is:
      {clicks}
    </p>
  );
};

export default ClicksAmount;
