export declare type AppScreens = "home" | "texture-to-model" | "data-tools";
export declare type AppSubScreen = "home" | "ttm-0" | "ttm-1" | "light-data" | "raw-voxel-data";
export declare const APP_STATE: {
    activeScreen: AppScreens;
    activeSubScreen: AppSubScreen;
};
export declare const setAppState: (activeScreen: AppScreens | "current", activeSubScreen: AppSubScreen) => void;
export declare const connectState: (screen: AppScreens) => {
    cascade: {
        origin: {
            activeScreen: AppScreens;
            activeSubScreen: AppSubScreen;
        };
        receiver(elm: HTMLElement, cascadeProps: typeof APP_STATE): void;
    };
};
export declare const connectSubState: (subScreen: AppSubScreen) => {
    cascade: {
        origin: {
            activeScreen: AppScreens;
            activeSubScreen: AppSubScreen;
        };
        receiver(elm: HTMLElement, cascadeProps: typeof APP_STATE): void;
    };
};
