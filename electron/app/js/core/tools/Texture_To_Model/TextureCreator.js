export const TextureCreator = {
    context: null,
    imgWidth: 16,
    imgHeight: 16,
    defineTextureDimensions(width, height) {
        this.imgWidth = width;
        this.imgHeight = height;
    },
    setUpImageCreation() {
        const TwoDcanvas = document.createElement("canvas");
        const context = TwoDcanvas.getContext("2d");
        if (!context) {
            throw new Error("Context did not load for texture creation.");
        }
        this.context = context;
    },
    _loadImages(imgPath, width, height) {
        const self = this;
        if (!self.context) {
            throw new Error("Context is not set for texture creation.");
        }
        const prom = new Promise((resolve) => {
            const loadedImage = new Image();
            loadedImage.src = imgPath;
            loadedImage.onload = function () {
                //@ts-ignore
                self.context.drawImage(loadedImage, 0, 0, width, height);
                //@ts-ignore
                const imgData = self.context.getImageData(0, 0, width, height);
                resolve(imgData.data);
                //import to clear the canvas before re-rendering another image
                //@ts-ignore
                self.context.clearRect(0, 0, width, height);
            };
        });
        return prom;
    },
    _combineImageData(totalLength, arrays) {
        const combinedImagedata = new Uint8ClampedArray(totalLength);
        const length = arrays[0].length;
        for (let i = 0; i < arrays.length; i++) {
            const array = arrays[i];
            const previousArrayIndex = length * i;
            combinedImagedata.set(array, previousArrayIndex);
        }
        return combinedImagedata;
    },
    getTextureBuffer(imgPath) {
        const self = this;
        if (!self.context) {
            throw new Error("Context is not set for texture creation.");
        }
        const prom = new Promise((resolve) => {
            const loadedImage = new Image();
            loadedImage.src = imgPath;
            loadedImage.onload = function () {
                const width = loadedImage.width;
                const height = loadedImage.height;
                //@ts-ignore
                self.context.drawImage(loadedImage, 0, 0, width, height);
                //@ts-ignore
                const imgData = self.context.getImageData(0, 0, width, height);
                resolve([imgData.data, loadedImage.width, loadedImage.height]);
                //@ts-ignore
                self.context.clearRect(0, 0, width, height);
            };
        });
        return prom;
    },
};
