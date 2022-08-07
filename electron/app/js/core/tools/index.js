import { TextureProcessor } from "./Texture_To_Model/TextureProcessor.js";
import { Screen } from "../../elements/Screen.js";
import { TTMScreen } from "./Texture_To_Model/screen/TTMScreen.js";
import { DataToolScreens } from "./Data_Tools/index.js";
export const $INIT = async () => {
    TextureProcessor.$INIT();
};
export const ToolScrenes = () => {
    return [
        Screen("texture-to-model", false, TTMScreen()),
        Screen("data-tools", false, DataToolScreens()),
    ];
};
