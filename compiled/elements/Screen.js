import { connectState, connectSubState, } from "../core/state/State.js";
export const Screen = (screenName, active, children) => {
    let className = "screen";
    if (active) {
        className += " active";
    }
    else {
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
export const SubScreen = (screenName, active, children) => {
    let className = "subscreen";
    if (active) {
        className += " active";
    }
    else {
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
