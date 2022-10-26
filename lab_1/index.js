import Jimp from 'jimp';
import {colorFilterMutate, getPixels} from "./helpers/index.js";

const pictureBMP = './assets/picture.bmp';

const lab1 = async () => {
    const imagesToSave = {};

    const imageInit = await Jimp.read(pictureBMP);

    // clone image to avoid mutation
    const image = imageInit.clone();
    imagesToSave.init = image;

    // get image pixels
    const pixels = getPixels(imagesToSave.init);

    // Make image manipulations

    // images by filtered colors
    ['r', 'g', 'b'].forEach((color) => {
        const imageColor = imagesToSave.init.clone();
        colorFilterMutate({image: imageColor, pixels, color})
        imagesToSave[color] = imageColor;
    });

    // monochrome
    const greyscaleImage = imagesToSave.init.clone();
    greyscaleImage.greyscale();
    imagesToSave.greyscale = greyscaleImage;

    // contrast
    ['init', 'r', 'g', 'b', 'greyscale'].forEach(keyToContrast => {
        const contrastImage = imagesToSave[keyToContrast].clone();
        // adjust the contrast by a value -1 to +1
        contrastImage.contrast(1);
        imagesToSave[`contrast_${keyToContrast}`] = contrastImage;
    });

    // invert
    const invertImage = imagesToSave.init.clone();
    invertImage.invert();
    imagesToSave.invert = invertImage;


    // equalization ?
    // filter ?
    // segmentation ?

    // яскравість
    // .brightness( val ); // adjust the brighness by a value -1 to +1

    // якість
    // .quality()

    /*
    // normalize
    const normalizeImage = imagesToSave.init.clone();
    normalizeImage.normalize();
    imagesToSave.normalize = normalizeImage;
    */

    return imagesToSave;
};

// save images
lab1().then((images) => {
    Object.entries(images)
        .forEach(([prefix, imageToSave]) => {
            const shouldPutToFolder = prefix.includes('_');
            const path = shouldPutToFolder
                ? prefix.split('_').join('/')
                : prefix;
            imageToSave.write(`./result/${path}.bmp`);
        });
});
