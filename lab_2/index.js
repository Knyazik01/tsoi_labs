import Jimp from 'jimp';
import {applyMatrixFilterMutate, getPixels, greyscaleImageMutate, saveImages} from "./helpers/index.js";
import {MATRIX_FITERS} from "./constants/index.js";

const pictureBMP = './assets/picture.bmp';

const lab2 = async () => {
    const imagesToSave = {};

    const imageInit = await Jimp.read(pictureBMP);

    // clone image to avoid mutation
    const image = imageInit.clone();
    imagesToSave.init = image;

    // get image pixels
    // const pixels = getPixels(imagesToSave.init);

    // Make image manipulations
    // monochrome
    const imageToFilter = imagesToSave.init.clone();
    greyscaleImageMutate(imageToFilter);
    imagesToSave.toFilter = imageToFilter;

    const laplasImage = imageToFilter.clone();
    applyMatrixFilterMutate({ image: laplasImage, filter: MATRIX_FITERS.LAPLAS, formatResult: (value) => {
        if (value < 0) return 0;
        if (value > 255) return 255;
        return value;
    } });
    imagesToSave.laplas = laplasImage;

    const gausImage = imageToFilter.clone();
    applyMatrixFilterMutate({ image: gausImage, filter: MATRIX_FITERS.GAUS, formatResult: (result) => result / 16 });
    imagesToSave.gaus = gausImage;

    return imagesToSave;
};

// save images
lab2().then(saveImages);
