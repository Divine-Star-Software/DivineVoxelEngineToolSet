import { AppScreens, AppSubScreen } from "../core/state/State.js";
import type { ElementTreeData } from "libs/et/index";
export declare const Screen: (screenName: AppScreens, active: boolean, children: ElementTreeData) => ElementTreeData;
export declare const SubScreen: (screenName: AppSubScreen, active: boolean, children: ElementTreeData) => ElementTreeData;
