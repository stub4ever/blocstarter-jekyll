// Import only scripts that needs to run soon as possible

import './libs/modernizr'; // Detects custom features for browser supports > https://modernizr.com/
import 'picturefill'; // Polyfill for responsive image browser >  https://github.com/scottjehl/picturefill
import 'lazysizes'; // Lazyload for img, iframe for speed page > https://github.com/aFarkas/lazysizes


//add simple support for background images:
//<div class="lazyload" data-bg="image.jpg"></div>
document.addEventListener('lazybeforeunveil', function(e){
    var bg = e.target.getAttribute('data-bg');
    if(bg){
        e.target.style.backgroundImage = 'url(' + bg + ')';
    }
});

// Set waypoints to refresh everytime a new image is lazyloaded
