/** This function return matrix of image's pixels in hex format
 * @param image - Jimp image
 * @param {[number[]]} pixels - Jimp image
 * */
const reverseImageMutate = ({image, pixels}) => {
    for (let currentY = 0; currentY < pixels.length; currentY += 1) {
        for (let currentX = 0; currentX < pixels[currentY].length; currentX += 1) {
            const x = pixels[currentY].length - currentX - 1;
            const y = pixels.length - currentY - 1;
            const colorToSet = pixels[currentY][currentX];
            image.setPixelColor(colorToSet, x, y);
        }
    }
}

export default reverseImageMutate;