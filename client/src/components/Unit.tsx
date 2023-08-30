import React, { useContext } from 'react';
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
  const { setCurPointer, settingNewPoint } = useContext(GlobalContext);

  const handleMyPoint = (x, y) => {
    if (settingNewPoint) setCurPointer([x, y]);
  };

  return (
    <div
      className='unit'
      onMouseDown={() => handleMyPoint(props.x, props.y)}
      onClick={() => handleMyPoint(props.x, props.y)}></div>
  );
};
