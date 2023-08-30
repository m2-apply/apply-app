import React, { useContext } from 'react';
import { GlobalContext } from '../../state';
import '../styles/OurPoint';

const OurPoint = ({ x, y }) => {
  const { unitHeight, unitWidth, pointerRadius, settingNewPoint } =
    useContext(GlobalContext);

  const style = {
    left: `calc(${x * unitWidth}px + ${unitWidth / 2}px`,
    top: `calc(${y * unitHeight}px + ${unitHeight / 2}px)`,
    position: 'absolute',
  };

  return (
    <div style={style}>
      <div className='point'></div>
      <div
        className={`${settingNewPoint ? 'radius active' : 'radius'}`}
        style={{ width: pointerRadius * 2, height: pointerRadius * 2 }}></div>
    </div>
  );
};

export default OurPoint;
