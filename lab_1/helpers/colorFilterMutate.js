import Jimp from "jimp";

/** This function return matrix of image's pixels in hex format
 * @param image - Jimp image
 * @param {[number[]]} pixels - Jimp image
 * @param {'r'|'g'|'b'} color - Jimp image
 * */
const colorFilterMutate = ({image, pixels, color}) => {
    for (let currentY = 0; currentY < pixels.length; currentY += 1) {
        for (let currentX = 0; currentX < pixels[currentY].length; currentX += 1) {
            const x = currentX;
            const y = currentY;
            const hex = pixels[y][x];
            const rgba = Jimp.intToRGBA(hex);
            const {[color]: filteredColor, a: alfaChanel, ...restColors} = rgba;
            const initColor = {
                [color]: filteredColor,
                a: alfaChanel,
            };
            const colorToSet = Object.keys(restColors)
                .reduce((colorObj, colorKey) => ({
                    ...colorObj,
                    [colorKey]: 0,
                }), initColor);
            const rgbaArray = [colorToSet.r, colorToSet.g, colorToSet.b, colorToSet.a];
            const curColor = Jimp.rgbaToInt(...rgbaArray);
            image.setPixelColor(curColor, x, y);
        }
    }
}

export default colorFilterMutate;