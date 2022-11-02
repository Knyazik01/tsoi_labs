const saveImages = (images) => {
    Object.entries(images)
        .forEach(([prefix, imageToSave]) => {
            const shouldPutToFolder = prefix.includes('_');
            const path = shouldPutToFolder
                ? prefix.split('_').join('/')
                : prefix;
            imageToSave.write(`./result/${path}.bmp`);
        });
};

export default saveImages;