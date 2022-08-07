import { ElementTree } from "../../../../libs/et/index.js";
import { TextureProcessor } from "../TextureProcessor.js";
import { SubScreen } from "../../../../elements/Screen.js";
import { dataOutput, formButton, formTitle, dataInput, form, } from "../../../../elements/Forms/Inputs.js";
const inputBind = {
    raw: "",
    result: "",
};
const formStates = {
    mode: 0,
};
const textAreaCascadeProps = {};
const [textAreaCascade] = ElementTree.cascade(textAreaCascadeProps);
const image = { img: null };
export const TTMConvertForDVE = () => {
    return SubScreen("ttm-1", true, form([
        formTitle("Convert For DVE"),
        dataInput(inputBind, "raw"),
        formButton("Covnert", async () => {
            try {
                const data = JSON.parse(inputBind.raw);
                inputBind.result = TextureProcessor.convertToFlatData(data);
                textAreaCascade();
            }
            catch (error) {
                alert("There was a problem parsing your input");
                inputBind.result = error;
                textAreaCascade();
            }
        }),
        dataOutput(inputBind, "result", textAreaCascadeProps),
    ]));
};
