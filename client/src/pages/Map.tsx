import React, { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
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
const [pointer, setpointer]= useState([]);
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

  const canvasWidth = 1350
  const canvasHeight = 410
  

  // Calculate the width and height of the canvas based on the aspect ratio and desired canvas width
  

  useEffect(() => {
    const canvas = document.getElementById('ellipseCanvas') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');

    const lat = 28.674861072043658;
    const lon = -81.7639904085645;
    const x = ((lon + 180) * (1350 / 360) * 2);
    const y = 410 - ((lat * (410 / 90)) * 2);

    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(255, 0, 255, 0.8)';
      ctx.beginPath();
      ctx.ellipse(x, y, 10, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    }
  }, []);

  return (
    <div className='map'>
      <div
        className={`mapCanvas ${settingNewPoint ? 'setting' : ''}`}
        style={{ position: 'relative' }}>
        <img src={USAMap} width='1350' />
        <div className='board'>{Board}
          {/* <canvas id='ellipseCanvas' width={canvasWidth} height={canvasHeight}> </canvas> */}
        </div>
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
