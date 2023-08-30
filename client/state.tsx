import React, { createContext, useState, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  isLoggedIn: boolean;
  setLoggedIn: boolean;
  userDetail: {};
  setUserDetail: {};
  curPointer: number[];
  setCurPointer: number[];
  pointerRadius: number;
  setPointerRadius: number;
  longitude: number;
  latitude: number;
  unitWidth: number;
  unitHeight: number;
  settingNewPoint: boolean;
  setSettingNewPoint: boolean;
  isDragging: boolean;
  setIsDragging: boolean;
};

export const GlobalContext = createContext<State>({});

// counting 0.5
const multiplier: number = 2;

const longitude: number = (60 - 20) * multiplier;
const latitude: number = (140 - 50) * multiplier;

export function GlobalProvider({ children }: Props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const [curPointer, setCurPointer] = useState([
    // 0, 0,
    Math.floor(latitude / 2),
    Math.floor(longitude / 2),
  ]);
  const [pointerRadius, setPointerRadius] = useState(188.06306306306);
  const [settingNewPoint, setSettingNewPoint] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const States: State = {
    isLoggedIn: loggedIn,
    setLoggedIn: setLoggedIn,
    userDetail: userDetail,
    setUserDetail: setUserDetail,
    curPointer: curPointer,
    setCurPointer: setCurPointer,
    pointerRadius: pointerRadius,
    setPointerRadius: setPointerRadius,
    settingNewPoint: settingNewPoint,
    setSettingNewPoint: setSettingNewPoint,
    // permanent props
    longitude: longitude,
    latitude: latitude,
    unitWidth: 1350 / latitude,
    unitHeight: 835 / longitude,
    isDragging: isDragging,
    setIsDragging: setIsDragging,
  };

  return (
    <GlobalContext.Provider value={States}>{children}</GlobalContext.Provider>
  );
}