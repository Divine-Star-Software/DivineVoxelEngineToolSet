import { Div } from "../elements/Div.js";
import { ElementTree } from "../libs/et/index.js";
import { CreateScene } from "./scene/CreateScene.js";
import { $INIT, ToolScrenes } from "./tools/index.js";
import { Menu } from "./menu/Menu.js";
import { HomeScreen } from "./screens/home/HomeScreen.js";
$INIT();
const MainScreen = () => {
    return Div("main", [Menu(), Div("screens", [HomeScreen(), ToolScrenes()])]);
};
ElementTree.linkCSS(import.meta.url, "../common.css");
ElementTree.bloomRoot(MainScreen());
CreateScene();
const substanceMap = {
    solid: 0,
    transparent: 1,
    flora: 2,
    fluid: 3,
    magma: 4,
};
const shapeMap = {
    Box: 0,
};
const colliderMap = {
    Box: 0,
};
const vt = {
    name: "Dream Stone",
    id: "dve:dreamstone",
    //only needed upon init
    states: ["no-grass"],
    substance: "flora",
    shapeId: "Box",
    physics: {
        checkCollisions: true,
        collider: "Box",
    },
    //only needed for rich data thread
    rich: {
        initalData: "",
    },
    lightSource: true,
    lightValue: 0x0fff,
};
const byteSizes = {
    indexes: 2,
    substance: 1,
    shapeId: 2,
    physicsCheckCollisions: 1,
    physicsColliderId: 2,
    lightSource: 1,
    lightValue: 2,
};
const vdIndexes = {
    name: 0,
    id: 1,
    substance: 2,
    shapeId: 3,
    physicsCheckCollisions: 4,
    physicsColliderId: 5,
    lightSource: 6,
    lightValue: 7,
};
const wrtieStringIntoBuffer = (string, index, dv) => {
    let final = 0;
    for (let i = 0; i < string.length; i++) {
        dv.setUint8(index + i, string.charCodeAt(i));
        final = i;
    }
    dv.setUint8(index + final + 1, "|".charCodeAt(0));
};
const getVDIndex = (index, dv) => {
    const i = dv.getUint16(vdIndexes[index] * 2);
    return i;
};
//1 bytes = 8 bits
const generateVDHeader = (vd) => {
    /**Header
     * name: 0 | name index - variable bytes
     * id:   1 | id index - variable bytes
     * substance: 2 | substance index - 1 byte
     * shapeId: 3 | shape id index - 2 bytes
     * physics check collision: 4 |  1 byte
     * physics collider id - check collision: 5 | 2 byte
     * lightSource: 6 | light source index | 1 byte
     * lightValue: 7 | light value index | 2 byte
     */
    const totalBytes = byteSizes.indexes * 8 +
        (vd.name.length + 1) +
        (vd.id.length + 1) +
        byteSizes.substance +
        byteSizes.shapeId +
        byteSizes.physicsCheckCollisions +
        byteSizes.physicsColliderId +
        byteSizes.lightSource +
        byteSizes.lightValue;
    const buffer = new ArrayBuffer(totalBytes);
    const dv = new DataView(buffer);
    let currentIndex = 8 * 2;
    //set name index
    dv.setUint16(0, currentIndex);
    currentIndex += vd.name.length + 1;
    //set id index
    dv.setUint16(2, currentIndex);
    currentIndex += vd.id.length + 1;
    //set substance index
    dv.setUint16(4, currentIndex);
    currentIndex += byteSizes.substance;
    //set shape id index
    dv.setUint16(6, currentIndex);
    currentIndex += byteSizes.shapeId;
    //set phsyics check collisions index
    dv.setUint16(8, currentIndex);
    currentIndex += byteSizes.physicsCheckCollisions;
    //set phsyics  collider id index
    dv.setUint16(10, currentIndex);
    currentIndex += byteSizes.physicsColliderId;
    //set lightSourceindex
    dv.setUint16(12, currentIndex);
    currentIndex += byteSizes.lightSource;
    //set lightValue
    dv.setUint16(14, currentIndex);
    currentIndex += byteSizes.lightValue;
    //set values
    wrtieStringIntoBuffer(vd.name, getVDIndex("name", dv), dv);
    wrtieStringIntoBuffer(vd.id, getVDIndex("id", dv), dv);
    dv.setUint8(getVDIndex("substance", dv), substanceMap[vd.substance]);
    dv.setUint16(getVDIndex("shapeId", dv), shapeMap[vd.shapeId]);
    dv.setUint8(getVDIndex("physicsCheckCollisions", dv), vd.physics?.checkCollisions ? 1 : 0);
    dv.setUint16(getVDIndex("physicsColliderId", dv), vd.physics?.collider ? colliderMap[vd.physics.collider] : 0);
    dv.setUint8(getVDIndex("lightSource", dv), vd?.lightSource ? 1 : 0);
    dv.setUint8(getVDIndex("lightValue", dv), vd?.lightValue ? vd.lightValue : 0);
    console.log(vd);
    console.log(new Uint8Array(buffer));
    readyVD(dv.buffer);
};
const readyStringFromBuffer = (index, dv) => {
    let i = 0;
    let s = "";
    while (true) {
        let char = String.fromCharCode(dv.getUint8(index + i));
        if (char == "|")
            break;
        s += char;
        i++;
    }
    return s;
};
const readyVD = (buffer) => {
    const dv = new DataView(buffer);
    const data = {
        name: readyStringFromBuffer(getVDIndex("name", dv), dv),
        id: readyStringFromBuffer(getVDIndex("id", dv), dv),
        substance: dv.getUint8(getVDIndex("substance", dv)),
        shapeId: dv.getUint16(getVDIndex("shapeId", dv)),
        checkCollisions: dv.getUint8(getVDIndex("physicsCheckCollisions", dv)),
        colliderId: dv.getUint16(getVDIndex("physicsColliderId", dv)),
        lightSource: dv.getUint8(getVDIndex("lightSource", dv)),
        lightValue: dv.getUint8(getVDIndex("lightValue", dv)),
    };
    console.log(data);
};
generateVDHeader(vt);
const t = [];
let t1 = performance.now();
let i = 100_000;
let k = i;
while (k--) {
    t.push(1);
}
const j = new Float32Array(t);
let t2 = performance.now();
console.log(t2 - t1);
k = i;
t1 = performance.now();
const d = new Float32Array(1000);
while (k--) {
    d[k] = 1;
}
t2 = performance.now();
console.log(t2 - t1);
