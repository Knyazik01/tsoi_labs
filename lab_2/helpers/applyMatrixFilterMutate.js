import {calcMatrixDeterminant, getItemsAround, getPixels, multCoefficients} from "./index.js";
import Jimp from "jimp";

/** This function return matrix of image's pixels in hex format
 * @param image - Jimp image
 * @param {[number[]]} filter - image filter to set by pixel area
 * */
const applyMatrixFilterMutate = ({image, filter}) => {
    const pixels = getPixels(image);
    const size = filter.length;

    for (let currentY = 0; currentY < pixels.length; currentY += 1) {
        for (let currentX = 0; currentX < pixels[currentY].length; currentX += 1) {
            const x = currentX;
            const y = currentY;
            const area = getItemsAround({
                matrix: pixels,
                rowIndex: y,
                columnIndex: x,
                size,
            });
            if (area) {
                const hex = pixels[y][x];
                const rgba = Jimp.intToRGBA(hex);
                const {a: alfaChanel} = rgba;

                const areasPerColor = ['r', 'g', 'b'].map(color => (
                    area.map((areaRow) => (
                        areaRow.map((areaItem) => {
                            const areaItemHex = areaItem;
                            const rgba = Jimp.intToRGBA(areaItemHex);
                            const {[color]: colorValue} = rgba;
                            return colorValue;
                        })
                    ))
                ));

                const newColorRGBArray = areasPerColor
                    .map((colorArea) => {
                        // TODO maybe mult matrix, not coefficients
                        const areaWithCoefficients = multCoefficients({matrix: colorArea, coefficients: filter});
                        const newValue = calcMatrixDeterminant(areaWithCoefficients) ?? 0;
                        if (newValue < 0) return 0;
                        debugger;
                        if (newValue > 255) return 255;
                        debugger;
                        return newValue;
                    });

                const rgbaArray = [...newColorRGBArray, alfaChanel];
                debugger;
                const curColor = Jimp.rgbaToInt(...rgbaArray);
                image.setPixelColor(curColor, x, y);
            } else {
                // don't change pixel
            }
        }
    }
};

export default applyMatrixFilterMutate;