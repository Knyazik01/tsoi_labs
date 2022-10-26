import Jimp from 'jimp';
import {getPixels, reverseImageMutate} from "./helpers/index.js";

const pictureBMP = './assets/picture.bmp';

const test = async () => {
    const imageInit = await Jimp.read(pictureBMP);

    // clone image to avoid mutation
    const image = imageInit.clone();

    // get image pixels
    const pixels = getPixels(image);

    // make image manipulations
    reverseImageMutate({image, pixels})

    // save image
    image.write('./result/result.bmp');
};

test();
