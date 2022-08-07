import { Div } from "../Div.js";
import {
  ElementTree,
  ElementTreeData,
  HTMLInputTypes,
  InputValueTypes,
} from "../../libs/et/index.js";

export const form = (children: ElementTreeData): ElementTreeData => {
  return [
    {
      type: "form",
      children: children,
    },
  ];
};

export const fileInput = (
  label: string,
  inputBind: any,
  bindToName: string,
  onLoad?: (file: string) => void
): ElementTreeData => {
  const elmRef: any = { input: null, display: null };
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
          onChange: (event: any) => {
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

export const input = (
  inputType: HTMLInputTypes,
  label: string,
  valueType: InputValueTypes,
  inputBind: any,
  bindToName: string
): ElementTreeData => {
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

export const textArea = (
  className: string,
  inputBind: any,
  bindToName: string,
  cascadeOrigin?: any
): ElementTreeData => {
  let cascade = {};
  if (cascadeOrigin) {
    cascade = {
      cascade: {
        origin: cascadeOrigin,
        receiver: (elm: HTMLTextAreaElement, cascade: any) => {
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

export const dataOutput = (
  inputBind: any,
  bindToName: string,
  cascadeOrigin?: any
): ElementTreeData => {
  let cascade = {};
  if (cascadeOrigin) {
    cascade = {
      cascade: {
        origin: cascadeOrigin,
        receiver: (elm: HTMLTextAreaElement, cascade: any) => {
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

export const dataInput = (
  inputBind: any,
  bindToName: string
): ElementTreeData => {
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

const formOption = (
  option: { text: string; value: string; active?: boolean },
  cascadeProps: any,
  onClick: Function
): ElementTreeData => {
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
        receiver: (elm: HTMLElement, props) => {
          if (props.option == option.value) {
            elm.classList.remove("inactive");
            elm.classList.add("active");
          } else {
            elm.classList.add("inactive");
            elm.classList.remove("active");
          }
        },
      },
      events: {
        onClick: onClick,
        onKeyDown: (event: KeyboardEvent) => {
          if (event.key == " " || event.key == "Enter") {
            onClick();
            (event as any).target.click();
          }
        },
      },
    },
  ];
};
export const formOptionSelect = (
  options: { text: string; value: string; active?: boolean }[],
  onChange: (value: string) => void
): ElementTreeData => {
  const cascadeProps = { option: "" };
  const [cascade] = ElementTree.cascade(cascadeProps);

  const elements: ElementTreeData = [];
  for (const option of options) {
    if (option.active) {
      cascadeProps.option = option.value;
    }
    elements.push(
      formOption(option, cascadeProps, () => {
        cascadeProps.option = option.value;
        cascade();
        onChange(option.value);
      })
    );
  }
  return Div("form-optin-group", elements);
};

export const formButton = (text: string, onClick: Function) => {
  return Div("form-group", [
    {
      type: "button",
      attrs: {
        className: "form-buttom",
      },
      text: text,
      events: {
        onClick: (event : any) => {
          event.preventDefault();
          onClick();
        },
      },
    },
  ]);
};

export const formText = (text: string) => {
  return Div("form-text", [
    {
      type: "p",
      text: text,
    },
  ]);
};

export const formTitle = (text: string) => {
  return Div("form-title", [
    {
      type: "h1",
      text: text,
    },
  ]);
};
