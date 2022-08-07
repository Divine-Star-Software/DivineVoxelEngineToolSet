import { ElementTreeData } from "libs/et/index"
import { LightToolScreen } from "./Light/LightTool.js"
import { VoxelDataToolScreen } from "./Voxel/VoxelTool.js"



export const DataToolScreens = ()  : ElementTreeData => {

        return [
            VoxelDataToolScreen(),
            LightToolScreen()
        ]
}