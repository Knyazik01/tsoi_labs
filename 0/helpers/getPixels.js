import Jimp from "jimp";

/**
 * getPixelsParams type define
 * @typedef {Object} getPixelsParams
 * @property {boolean=} isRGBaObj - colors will write as rgba objects
 */

/** This function return matrix of image's pixels in hex format
 * @param image - Jimp image
 * @param {getPixelsParams=} params
 * @return {[number[]]} image pixels
 * */
const getPixels = (image, params) => {
    const {isRGBaObj = false} = params ?? {};
    const imageWidth = image.getWidth();
    const imageHeight = image.getHeight();
    const result = [];

    for (let readY = 0; readY < imageHeight; readY += 1) {
        for (let readX = 0; readX < imageWidth; readX += 1) {
            const hex = image.getPixelColor(readX, readY);
            const colorToSet = isRGBaObj
                ? Jimp.intToRGBA(hex)
                : hex;

            result[readY]
                ? result[readY].push(colorToSet)
                : result.push([colorToSet]);
        }
    }

    return result;
}

export default getPixels;