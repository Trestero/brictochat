/* Tom Slavin
Handles all functionality relating to the images stored on the server.
Images are monochrome and on the server side will represent images as either a 1 or 0 right now.
*/

// Local fields and functions
let imageStorage = [];

const ParseImage = (img) => {
    return img;
}


// Outward-facing functions
const SaveImage = (img) => {
    
    // get the number that will be the image's index and save it
    let id = imageStorage.length;
    let item = ParseImage(img);
    
    // error checking
    if( item === null){
        return -1; // image didn't parse properly
    }
    else{   
        // image parsed, pass back its index as output
        imageStorage.push(item);
        return id;
    }
    
};

const GetImages = () => {
    return imageStorage;
};

// Assuming a valid ID is passed in, returns the image object
const GetImage = (id) => {
    if(id < 0 || id >= imageStorage.length) return null;
    
    return imageStorage[id];
};


module.exports = {
    SaveImage,
    GetImages,
    GetImage,
}