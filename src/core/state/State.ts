import { ElementTree } from "../../libs/et/ElementTree.js";

export type AppScreens = "home" | "texture-to-model" | "data-tools";
export type AppSubScreen =
  | "home"
  | "ttm-0"
  | "ttm-1"
  | "light-data"
  | "raw-voxel-data";

const appState = {
  activeScreen: <AppScreens>"hone",
  activeSubScreen: <AppSubScreen>"hone",
};

const appCascade = ElementTree.cascade(appState);

export const APP_STATE = appState;
export const setAppState = (
  activeScreen: AppScreens | "current",
  activeSubScreen: AppSubScreen
) => {
  if (activeScreen != "current") {
    appState.activeScreen = activeScreen;
  }
  appState.activeSubScreen = activeSubScreen;
  appCascade[0]();
};

export const connectState = (screen: AppScreens) => {
  return {
    cascade: {
      origin: APP_STATE,
      receiver(elm: HTMLElement, cascadeProps: typeof APP_STATE) {
        if (cascadeProps.activeScreen == screen) {
          elm.classList.remove("inactive");
          elm.classList.add("active");
        } else {
          elm.classList.add("inactive");
          elm.classList.remove("active");
        }
      },
    },
  };
};

export const connectSubState = (subScreen: AppSubScreen) => {
  return {
    cascade: {
      origin: APP_STATE,
      receiver(elm: HTMLElement, cascadeProps: typeof APP_STATE) {
        if (cascadeProps.activeSubScreen == subScreen) {
          elm.classList.remove("inactive");
          elm.classList.add("active");
        } else {
          elm.classList.add("inactive");
          elm.classList.remove("active");
        }
      },
    },
  };
};
