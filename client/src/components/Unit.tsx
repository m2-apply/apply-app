import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../state';
import '../styles/Unit';

type UnitProps = {
  x: number;
  y: number;
  key?: string;
};

export const Row = props => {
  const { latitude } = useContext(GlobalContext);
  const row: any[] = [];

  for (let i = 0; i < latitude; i++) {
    row.push(<Unit key={`${i}`} x={i} y={props.y} />);
  }
  return <div style={{ display: 'flex', flex: 1 }}>{row}</div>;
};

export const Unit = (props: UnitProps) => {
  const { setCurPointer, settingNewPoint, isDragging, setIsDragging } =
    useContext(GlobalContext);

  const handleDragOver = () => {
    if (settingNewPoint && isDragging) {
      console.log('handling');
      setCurPointer([props.x, props.y]);
    }
  };

  const handleGlobalMouseUp = () => {
    console.log('global mouse up');
    setIsDragging(false);
    document.removeEventListener('mouseup', handleGlobalMouseUp);
  };

  const handleMouseDown = () => {
    if (settingNewPoint) {
      setCurPointer([props.x, props.y]);
    }

    console.log('mouse down');
    setIsDragging(true);

    document.addEventListener('mouseup', handleGlobalMouseUp);
  };

  return (
    <div
      className='unit'
      onMouseDown={handleMouseDown}
      onMouseOver={handleDragOver}></div>
  );
};
