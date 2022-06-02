const imagesContainer = document.getElementById("imagesContainer");
const loader = document.getElementById("loader");

let ready = true;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

let count =  5;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 10;
    }
}

// helper function to set attributes
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for items
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imagesContainer.appendChild(item);        
    });
}



async function getPhotos() {
    try {
        console.log(count);
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();

    } catch(error) {
        // Catch errors
        console.log(error);
    }
}

// check to see if scrollling near bottom of page, then load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && ready) {            
        ready = false;
        getPhotos();
        
    }
  });
  
// on load
getPhotos();
