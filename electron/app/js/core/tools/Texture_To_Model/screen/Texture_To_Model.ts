import { ElementTree, ElementTreeData } from "../../../../libs/et/index.js";
import { TextureProcessor } from "../TextureProcessor.js";
import { SubScreen } from "../../../../elements/Screen.js";
import {
  input,
  fileInput,
  dataOutput,
  formButton,
  formTitle,
  formOptionSelect,
  form,
} from "../../../../elements/Forms/Inputs.js";
import { Div } from "../../../../elements/Div.js";

const inputBind = {
  file: "",
  fakeFile: "",
  id: "",
  result: "",
  depth: TextureProcessor.depth,
};
const formStates = {
  mode: 0,
};

const textAreaCascadeProps = {};

const [textAreaCascade] = ElementTree.cascade(textAreaCascadeProps);

const image: any = { img: null };

export const TextureToModelScreen = (): ElementTreeData => {
  return SubScreen(
    "ttm-0",
    true,
    form([
      formTitle("Texture To Model"),
      fileInput("texture", inputBind, "file", (file) => {
        console.log(file, image);
        if (image.img) {
          image.img.src = file;
        }
      }),
      Div("image-display", [
        {
          type: "img",
          attrs: {
            className: "pixel-image-display",
          },
          toRef: {
            refObj: image,
            refObjProperty: "img",
          },
        },
      ]),
      input("text", "ID", "string", inputBind, "id"),
      input("number", "Depth", "number", inputBind, "depth"),
      formOptionSelect(
        [
          { text: "Generate editable version.", value: "0", active: true },
          { text: "Generate version for DVE.", value: "1" },
        ],
        (value) => {
          formStates.mode = Number(value);
        }
      ),
      formButton("Generate", async (event: MouseEvent) => {
        event.preventDefault();
        if (inputBind.file == "") {
          alert("Must select a file");
        }
        TextureProcessor.depth = inputBind.depth;
        console.log(inputBind.depth);
        const result = await TextureProcessor.processTexture(
          inputBind.id,
          inputBind.file,
          (formStates as any).mode
        );
        if (result) {
          inputBind.result = result;
        }
        textAreaCascade();
      }),
      dataOutput(inputBind, "result", textAreaCascadeProps),
    ])
  );
};
