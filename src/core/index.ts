import { Div } from "../elements/Div.js";
import { ElementTree, ElementTreeData } from "../libs/et/index.js";
import { CreateScene } from "./scene/CreateScene.js";
import { $INIT, ToolScrenes } from "./tools/index.js";
import { Menu } from "./menu/Menu.js";
import { HomeScreen } from "./screens/home/HomeScreen.js";

$INIT();

const MainScreen = (): ElementTreeData => {
  return Div("main", [Menu(), Div("screens", [HomeScreen(), ToolScrenes()])]);
};

ElementTree.linkCSS(import.meta.url, "../common.css");

ElementTree.bloomRoot(MainScreen());
CreateScene();
