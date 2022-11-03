import { getItemsAround, getMatrixSum, getPixels, multCoefficients } from "./index.js";
import Jimp from "jimp";

/** This function return matrix of image's pixels in hex format
 * @param image - Jimp image
 * @param {[number[]]} filter - image filter to set by pixel area
 * */
const applyMatrixFilterMutate = ({image, filter, formatResult }) => {
    const format = formatResult ? formatResult : (v) => v;
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
                        const areaWithCoefficients = multCoefficients({matrix: colorArea, coefficients: filter});
                        // const newValue = calcMatrixDeterminant(areaWithCoefficients) ?? 0;
                        const newValue = getMatrixSum(areaWithCoefficients) ?? 0;
                        return format(newValue);
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