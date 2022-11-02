import Jimp from "jimp";
import {getPixels} from "./index.js";

/** This function return matrix of image's pixels in hex format
 * @param image - Jimp image
 * */

const greyscaleImageMutate = (image) => {
    const pixels = getPixels(image);
    for (let currentY = 0; currentY < pixels.length; currentY += 1) {
        for (let currentX = 0; currentX < pixels[currentY].length; currentX += 1) {
            const x = currentX;
            const y = currentY;
            const hex = pixels[y][x];
            const rgba = Jimp.intToRGBA(hex);
            const {r, g, b, a: alfaChanel} = rgba;
            const averageColor = Math.trunc((r + g + b) / 3);
            const rgbaArray = [averageColor, averageColor, averageColor, alfaChanel];
            const curColor = Jimp.rgbaToInt(...rgbaArray);
            image.setPixelColor(curColor, x, y);
        }
    }
};

export default greyscaleImageMutate;