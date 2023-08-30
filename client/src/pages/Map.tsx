import React, { useContext } from 'react';
import '../styles/Map';
import USAMap from '../assets/NorthAmerica.png';
import { GlobalContext } from '../../state';
import { Unit, Row } from '../components/Unit';
import OurPoint from '../components/OurPoint';

const MapView = () => {
  const {
    setLoggedIn,
    setPointerRadius,
    pointerRadius,
    longitude,
    curPointer,
    settingNewPoint,
    setSettingNewPoint,
  } = useContext(GlobalContext);

  const handleNewLocation = () => {
    !settingNewPoint ? setSettingNewPoint(true) : setSettingNewPoint(false);
  };

  const handleChange = e => {
    setPointerRadius(Number(e.target.value));
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const Board: any[] = [];
  for (let i = 0; i < longitude; i++) {
    Board.push(<Row y={i} />);
  }

  return (
    <div className='map'>
      <div className='mapCanvas' style={{ position: 'relative' }}>
        <img src={USAMap} width='1350' />
        <div className='board'>{Board}</div>
        <OurPoint x={curPointer[0]} y={curPointer[1]} />
      </div>

      {pointerRadius}

      <div style={{ display: 'flex', gap: '5px' }}>
        <input
          type='range'
          min='1'
          max='100'
          value={pointerRadius}
          onChange={handleChange}></input>
      </div>

      <div style={{ display: 'flex', gap: '15px' }}>
        <button
          className={`genericButtonMap ${
            settingNewPoint ? 'setting' : 'white'
          }`}
          onClick={handleNewLocation}>
          Set New Point
        </button>
        <button className='genericButtonMap white' onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default MapView;
