import { LightByte } from "../../../../libs/dve/Global/Util/LightByte.js";
import {
  form,
  formButton,
  formText,
  formTitle,
  input,
} from "../../../../elements/Forms/Inputs.js";
import { SubScreen } from "../../../../elements/Screen.js";
import { ElementTree } from "../../../../libs/et/ElementTree.js";
import { Div } from "../../../../elements/Div.js";

const lightFormData = {
  r: 0,
  g: 0,
  b: 0,
  lightValue: 0,
};


const getLightValueText = (lv: number) => {
    const s = LightByte.getS(lv);
    const r = LightByte.getR(lv);
    const g = LightByte.getG(lv);
    const b = LightByte.getB(lv);
    return `
  S :   ${s}
  R :   ${r}
  G :   ${g}
  B :   ${b}
  `;
  };
  

const lightEncodeCascadeProps = { lightValue: 0 };
const [lightEncodeCascade] = ElementTree.cascade(lightEncodeCascadeProps);

const lightDecodeCascadeProps = {};
const [lightDecodeCascade] = ElementTree.cascade(lightDecodeCascadeProps);

export const LightToolScreen = () => {
  return SubScreen(
    "light-data",
    false,
    form([
      formTitle("Light Tool"),
      formText("Get a light value. Any value above 15 will be set to 15."),
      input("number", "R:", "number", lightFormData, "r"),
      input("number", "G:", "number", lightFormData, "g"),
      input("number", "B:", "number", lightFormData, "b"),
      formButton("Encode", () => {
        let lv = LightByte.setR(lightFormData.r, 0);
        lv = LightByte.setG(lightFormData.g, lv);
        lv = LightByte.setB(lightFormData.b, lv);
        lightEncodeCascadeProps.lightValue = lv;
        lightEncodeCascade();
      }),
      Div("form-text", [
        {
          type: "p",
          text: "0",
          cascade: {
            origin: lightEncodeCascadeProps,
            receiver(elm, cascadeProps) {
              elm.innerText = String(cascadeProps.lightValue);
            },
          },
        },
      ]),
      {
        type: "div",
        attrs: {
          className: "color-display",
        },
        cascade: {
          origin: lightEncodeCascadeProps,
          receiver(elm: HTMLElement, cascadeProps) {
            elm.style.cssText = `background-color:rgb(${
              (lightFormData.r / 15) * 255
            },${(lightFormData.g / 15) * 255},${
              (lightFormData.b / 15) * 255
            });`;
          },
        },
      },
      formText("Decode a light value."),
      input("number", "Light Value: ", "number", lightFormData, "lightValue"),
      formButton("Decode", () => {
        lightDecodeCascade();
      }),
      Div("form-text", [
        {
          type: "p",
          text: getLightValueText(0),
          cascade: {
            origin: lightDecodeCascadeProps,
            receiver(elm, cascadeProps) {
              elm.innerText = getLightValueText(lightFormData.lightValue);
            },
          },
        },
      ]),
    ])
  );
};

