import { ElementTree } from "../../../../libs/et/ElementTree.js";
import {
  dataOutput,
  form,
  formButton,
  formTitle,
  input,
} from "../../../../elements/Forms/Inputs.js";
import { SubScreen } from "../../../../elements/Screen.js";
import { Div } from "../../../../elements/Div.js";
import { Util } from "../../../../libs/dve/Global/Util.helper.js";

const voxelByte = Util.getVoxelByte();
const lightByte = Util.getLightByte();

const voxelDataDecode = {
  "numeric id": 0,
  "light value": {
    s: 0,
    r: 0,
    g: 0,
    b: 0,
  },
  "shape state": 0,
  "level state": 0,
  level: 0,
  "extra voxel numeric id": 0,
};
const voxelFormData = {
  voxelData: 0,
  voxelStateData: 0,
  result: JSON.stringify(voxelDataDecode, null, 1),
};

const dataCascadeProps = {};
const [datacascade] = ElementTree.cascade(dataCascadeProps);

const getVoxelDataText = (voxelData: number, voxelState: number) => {
  voxelDataDecode["numeric id"] = voxelByte.getId(voxelData);
  const lv = voxelByte.decodeLightFromVoxelData(voxelData);
  voxelDataDecode["light value"].s = lightByte.getS(lv);
  voxelDataDecode["light value"].r = lightByte.getR(lv);
  voxelDataDecode["light value"].g = lightByte.getG(lv);
  voxelDataDecode["light value"].b = lightByte.getB(lv);
  voxelDataDecode["shape state"] = voxelByte.getShapeState(voxelState);
  voxelDataDecode["level state"] =
    voxelByte.decodeLevelStateFromVoxelData(voxelState);
  voxelDataDecode["level"] = voxelByte.decodeLevelFromVoxelData(voxelState);
  voxelDataDecode["extra voxel numeric id"] = voxelByte.getId(voxelState);
  voxelFormData.result = JSON.stringify(voxelDataDecode, null, 1);
};

export const VoxelDataToolScreen = () => {
  return SubScreen(
    "raw-voxel-data",
    true,
    form([
      formTitle("Raw Voxel Data Tool"),
      input("number", "Voxel Data:", "number", voxelFormData, "voxelData"),
      input(
        "number",
        "Voxel State Data:",
        "number",
        voxelFormData,
        "voxelStateData"
      ),
      formButton("Decode", () => {
        getVoxelDataText(voxelFormData.voxelData, voxelFormData.voxelStateData);
        datacascade();
      }),
      dataOutput(voxelFormData, "result", dataCascadeProps),
    ])
  );
};
