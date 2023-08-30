import React, { useContext } from 'react';
import '../styles/Map';
import USAMap from '../assets/NorthAmerica2.png';
import { GlobalContext } from '../../state';
import { Unit, Row } from '../components/Unit';
import OurPoint from '../components/OurPoint';

const unit: number = 0.1880630631;

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
    if (settingNewPoint) setPointerRadius(Number(e.target.value));
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
      <div
        className={`mapCanvas ${settingNewPoint ? 'setting' : ''}`}
        style={{ position: 'relative' }}>
        <img src={USAMap} width='1350' />
        <div className='board'>{Board}</div>
        <OurPoint x={curPointer[0]} y={curPointer[1]} />
      </div>

      <div style={{ marginTop: '-50px', marginBottom: '15px', zIndex: 200 }}>
        Approx. Seismic Radius: {(pointerRadius * 5.3173652695).toFixed(2)}km
      </div>

      <div style={{ display: 'flex', gap: '5px' }}>
        <input
          type='range'
          min={unit * 50}
          max={unit * 2000}
          value={pointerRadius}
          class={`${settingNewPoint ? 'slider' : 'slider faded'}`}
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