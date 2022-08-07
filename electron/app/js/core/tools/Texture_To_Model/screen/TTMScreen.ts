import { TTMConvertForDVE } from "./Convert_For_DVE.js";
import { TextureToModelScreen } from "./Texture_To_Model.js";

export const TTMScreen = () => {
  return [TTMConvertForDVE(), TextureToModelScreen()];
};
