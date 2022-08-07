import { LightToolScreen } from "./Light/LightTool.js";
import { VoxelDataToolScreen } from "./Voxel/VoxelTool.js";
export const DataToolScreens = () => {
    return [
        VoxelDataToolScreen(),
        LightToolScreen()
    ];
};
