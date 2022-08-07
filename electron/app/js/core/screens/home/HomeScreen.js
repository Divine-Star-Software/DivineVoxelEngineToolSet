import { Div } from "../../../elements/Div.js";
import { H1 } from "../../../elements/H1.js";
import { DSLogo } from "../../../elements/DSLogo/DSLogo.js";
import { Screen } from "../../../elements/Screen.js";
export const HomeScreen = () => {
    return Screen("home", true, [
        Div("ds-logo-container", DSLogo("ds-logo")),
        H1("ds-title", "Divine Voxel Engine Tool Set"),
    ]);
};
