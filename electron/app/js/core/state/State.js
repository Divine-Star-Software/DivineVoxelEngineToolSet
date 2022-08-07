import { ElementTree } from "../../libs/et/ElementTree.js";
const appState = {
    activeScreen: "hone",
    activeSubScreen: "hone",
};
const appCascade = ElementTree.cascade(appState);
export const APP_STATE = appState;
export const setAppState = (activeScreen, activeSubScreen) => {
    if (activeScreen != "current") {
        appState.activeScreen = activeScreen;
    }
    appState.activeSubScreen = activeSubScreen;
    appCascade[0]();
};
export const connectState = (screen) => {
    return {
        cascade: {
            origin: APP_STATE,
            receiver(elm, cascadeProps) {
                if (cascadeProps.activeScreen == screen) {
                    elm.classList.remove("inactive");
                    elm.classList.add("active");
                }
                else {
                    elm.classList.add("inactive");
                    elm.classList.remove("active");
                }
            },
        },
    };
};
export const connectSubState = (subScreen) => {
    return {
        cascade: {
            origin: APP_STATE,
            receiver(elm, cascadeProps) {
                if (cascadeProps.activeSubScreen == subScreen) {
                    elm.classList.remove("inactive");
                    elm.classList.add("active");
                }
                else {
                    elm.classList.add("inactive");
                    elm.classList.remove("active");
                }
            },
        },
    };
};
