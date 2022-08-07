import {
  AppScreens,
  AppSubScreen,
  connectState,
  connectSubState,
} from "../core/state/State.js";
import type { ElementTreeData } from "libs/et/index";

export const Screen = (
  screenName: AppScreens,
  active: boolean,
  children: ElementTreeData
): ElementTreeData => {
  let className = "screen";
  if (active) {
    className += " active";
  } else {
    className += " inactive";
  }
  return [
    {
      type: "div",
      attrs: {
        className: className,
      },
      children: children,
      ...connectState(screenName),
    },
  ];
};

export const SubScreen = (
  screenName: AppSubScreen,
  active: boolean,
  children: ElementTreeData
): ElementTreeData => {
  let className = "subscreen";
  if (active) {
    className += " active";
  } else {
    className += " inactive";
  }
  return [
    {
      type: "div",
      attrs: {
        className: className,
      },
      children: children,
      ...connectSubState(screenName),
    },
  ];
};
