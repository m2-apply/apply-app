import React, { useContext } from 'react';
import { GlobalContext } from '../../state';
import '../styles/OurPoint';

const OurPoint = ({ x, y }) => {
  const { unitHeight, unitWidth } = useContext(GlobalContext);

  const style = {
    left: `calc(${x * unitWidth}px + ${unitWidth / 2}px`,
    top: `calc(${y * unitHeight}px + ${unitHeight / 2}px)`,
    position: 'absolute',
  };

  return <div className='point' style={style}></div>;
};

export default OurPoint;
