const imageContainer=document.getElementById('image-container');
const loader=document.getElementById('loader');

let ready=false;
let imagesLoaded=0;
let totalImages=0;
let photosArray=[];

//Unsplash API
const collections="travel";
const count=30;
const apiKey='CfgPAzEcuUI3rtpGqSt5Io41gLmX7mNNOFHg_6AklA4'
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&collections=${collections}`;

//check if all image were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded===totalImages){
        ready=true;
        loader.hidden=true;
    }
}

//Helper Function to set attributes on DOM Elements
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

//Display Photos

function displayPhotos(){
    imagesLoaded=0;
    totalImages=photosArray.length; 
    photosArray.forEach(photo=>{
        //Create <a> to link to Unsplash
        const item=document.createElement('a');
        setAttributes(item,{
            href:photo.links.html,
            target:"_blank"
        })
        //Create <img> for photo
        const img=document.createElement('img');
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        })
        //Event Listener, check when each is finished loading
        img.addEventListener('load',imageLoaded)
        //Put <img> inside <a>, then put both inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//Get photos from Unsplash API

async function getPhotos(){
    
    fetch(apiUrl)
    .then(response=>response.json())
    .then(response=>{
        photosArray=response;
        displayPhotos();
    }).catch(ex=>{
        console.log(ex);
    })

}

//Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll',()=>{
    if(window.innerHeight+window.scrollY>= document.body.offsetHeight-1000 && ready){
        ready=false;
        getPhotos();
    }
})

//On load
getPhotos();