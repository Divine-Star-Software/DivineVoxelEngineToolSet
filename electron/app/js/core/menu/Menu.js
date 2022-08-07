import { connectState, connectSubState, setAppState, } from "../../core/state/State.js";
import { Div } from "../../elements/Div.js";
import { ElementTree } from "../../libs/et/index.js";
const menuButton = (title, screen, subScreen) => {
    let className = "menu-button";
    if (screen == "home") {
        className += " active";
    }
    return [
        {
            type: "div",
            attrs: {
                tabindex: 0,
                className: className,
            },
            children: [
                {
                    type: "p",
                    text: title,
                },
            ],
            ...connectState(screen),
            events: {
                onClick: () => {
                    setAppState(screen, subScreen);
                },
                onKeyDown: (event) => {
                    if (event.key == " " || event.key == "Enter") {
                        setAppState(screen, subScreen);
                    }
                },
            },
        },
    ];
};
const subMenuButton = (title, subScreen) => {
    let className = "sub-menu-button";
    return [
        {
            type: "div",
            attrs: {
                tabindex: 0,
                className: className,
            },
            children: [
                {
                    type: "p",
                    text: title,
                },
            ],
            ...connectSubState(subScreen),
            events: {
                onClick: () => {
                    setAppState("current", subScreen);
                },
                onKeyDown: (event) => {
                    if (event.key == " " || event.key == "Enter") {
                        setAppState("current", subScreen);
                    }
                },
            },
        },
    ];
};
const subMenuSection = (screen, children) => {
    let className = "sub-menu-section inactive";
    return [
        {
            type: "div",
            attrs: {
                className: className,
            },
            children: children,
            ...connectState(screen),
        },
    ];
};
export const Menu = () => {
    return Div("menu", [
        Div("menu-title", [
            {
                type: "h3",
                text: "Tools",
            },
        ]),
        menuButton("Home", "home", "home"),
        menuButton("Texture To Model", "texture-to-model", "ttm-0"),
        subMenuSection("texture-to-model", [
            subMenuButton("Generate", "ttm-0"),
            subMenuButton("Convert For DVE", "ttm-1"),
        ]),
        menuButton("Data Tools", "data-tools", "raw-voxel-data"),
        subMenuSection("data-tools", [
            subMenuButton("Raw Voxel Data", "raw-voxel-data"),
            subMenuButton("Light Data", "light-data"),
        ]),
    ]);
};
ElementTree.linkCSS(import.meta.url, "./Menu.css");
