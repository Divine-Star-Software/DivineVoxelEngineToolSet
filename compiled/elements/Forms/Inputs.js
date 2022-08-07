import { Div } from "../Div.js";
import { ElementTree, } from "../../libs/et/index.js";
export const form = (children) => {
    return [
        {
            type: "form",
            children: children,
        },
    ];
};
export const fileInput = (label, inputBind, bindToName, onLoad) => {
    const elmRef = { input: null, display: null };
    return [
        Div("form-group", [
            formButton("Upload A File", () => {
                if (elmRef.input) {
                    elmRef.input.click();
                }
            }),
            {
                type: "input",
                attrs: {
                    id: "file-upload",
                    input: {
                        type: "file",
                    },
                },
                toRef: {
                    refObj: elmRef,
                    refObjProperty: "input",
                },
                bindInput: {
                    bindTo: inputBind,
                    objectPropertyName: bindToName,
                    valueType: "string",
                },
                events: {
                    onChange: (event) => {
                        const target = event.target;
                        const file = target.files[0].path;
                        inputBind.file = file;
                        if (elmRef.display) {
                            elmRef.display.innerText = file;
                        }
                        if (onLoad) {
                            onLoad(file);
                        }
                    },
                },
            },
        ]),
        Div("form-text", [
            {
                type: "p",
                text: "No File Chosen",
                toRef: {
                    refObj: elmRef,
                    refObjProperty: "display",
                },
            },
        ]),
    ];
};
export const input = (inputType, label, valueType, inputBind, bindToName) => {
    return Div("form-group", [
        {
            type: "label",
            text: label,
        },
        {
            type: "input",
            attrs: {
                id: "file-upload",
                input: {
                    type: inputType,
                },
            },
            bindInput: {
                bindTo: inputBind,
                objectPropertyName: bindToName,
                valueType: valueType,
            },
        },
    ]);
};
export const textArea = (className, inputBind, bindToName, cascadeOrigin) => {
    let cascade = {};
    if (cascadeOrigin) {
        cascade = {
            cascade: {
                origin: cascadeOrigin,
                receiver: (elm, cascade) => {
                    elm.value = inputBind[bindToName];
                },
            },
        };
    }
    return Div("form-group", [
        {
            type: "textarea",
            attrs: {
                className: className,
            },
            bindInput: {
                bindTo: inputBind,
                objectPropertyName: bindToName,
                valueType: "string",
            },
            ...cascade,
        },
    ]);
};
export const dataOutput = (inputBind, bindToName, cascadeOrigin) => {
    let cascade = {};
    if (cascadeOrigin) {
        cascade = {
            cascade: {
                origin: cascadeOrigin,
                receiver: (elm, cascade) => {
                    elm.value = inputBind[bindToName];
                },
            },
        };
    }
    return Div("form-group", [
        {
            type: "textarea",
            attrs: {
                className: "data-display",
                textarea: {
                    rows: 20,
                    cols: 200,
                    readOnly: true,
                },
            },
            bindInput: {
                bindTo: inputBind,
                objectPropertyName: bindToName,
                valueType: "string",
            },
            ...cascade,
        },
    ]);
};
export const dataInput = (inputBind, bindToName) => {
    return Div("form-group", [
        {
            type: "textarea",
            attrs: {
                className: "data-display",
                textarea: {
                    rows: 20,
                    cols: 200,
                },
            },
            bindInput: {
                bindTo: inputBind,
                objectPropertyName: bindToName,
                valueType: "string",
            },
        },
    ]);
};
const formOption = (option, cascadeProps, onClick) => {
    let className = "form-option";
    if (option.active) {
        className += " active";
    }
    return [
        {
            type: "div",
            attrs: {
                className: className,
                tabindex: 0,
            },
            children: [
                {
                    type: "p",
                    attrs: {
                        className: "form-option-text",
                    },
                    text: option.text,
                },
            ],
            cascade: {
                origin: cascadeProps,
                receiver: (elm, props) => {
                    if (props.option == option.value) {
                        elm.classList.remove("inactive");
                        elm.classList.add("active");
                    }
                    else {
                        elm.classList.add("inactive");
                        elm.classList.remove("active");
                    }
                },
            },
            events: {
                onClick: onClick,
                onKeyDown: (event) => {
                    if (event.key == " " || event.key == "Enter") {
                        onClick();
                        event.target.click();
                    }
                },
            },
        },
    ];
};
export const formOptionSelect = (options, onChange) => {
    const cascadeProps = { option: "" };
    const [cascade] = ElementTree.cascade(cascadeProps);
    const elements = [];
    for (const option of options) {
        if (option.active) {
            cascadeProps.option = option.value;
        }
        elements.push(formOption(option, cascadeProps, () => {
            cascadeProps.option = option.value;
            cascade();
            onChange(option.value);
        }));
    }
    return Div("form-optin-group", elements);
};
export const formButton = (text, onClick) => {
    return Div("form-group", [
        {
            type: "button",
            attrs: {
                className: "form-buttom",
            },
            text: text,
            events: {
                onClick: (event) => {
                    event.preventDefault();
                    onClick();
                },
            },
        },
    ]);
};
export const formText = (text) => {
    return Div("form-text", [
        {
            type: "p",
            text: text,
        },
    ]);
};
export const formTitle = (text) => {
    return Div("form-title", [
        {
            type: "h1",
            text: text,
        },
    ]);
};
