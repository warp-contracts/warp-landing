import { docReady } from './utils';
import navbarInit from './bootstrap-navbar';
import detectorInit from './detector';
import scrollToTop from './scroll-to-top';
// import * as buffer from 'buffer';

// window.Buffer = buffer.Buffer;
// /* -------------------------------------------------------------------------- */
// /*                            Theme Initialization                            */
// /* -------------------------------------------------------------------------- */

docReady(navbarInit);
docReady(detectorInit);
docReady(scrollToTop);

// if (videoElem) {
// if (!isDeviceMobile()) {
var scriptEle = document.createElement('script');
// var scriptEleBuf = document.createElement('script');

scriptEle.setAttribute('src', 'vendors/@lottiefiles/lottie-player.js');
// scriptEleBuf.setAttribute('src', 'vendors/buffer/index.js');

document.getElementsByTagName('body')[0].appendChild(scriptEle);

document.getElementById('weave-animation').innerHTML = `            
        <lottie-player id="weave-lottie" autoplay="true" loop="true" speed="1" src="assets/animations/weave.json"
        style="background: transparent" background="transparent"></lottie-player>`;

document.getElementById('baloon-animation').innerHTML = `            
      <lottie-player autoplay="true" loop="true" speed="1" src="assets/animations/baloon.json"
                    style="background: transparent" background="transparent"></lottie-player>`;

document.getElementById('gears-animation').innerHTML = `            
      <lottie-player autoplay="true" loop="true" speed="1" src="assets/animations/gears.json"
                    style="background: transparent" background="transparent"></lottie-player>`;

// } else {
//   videoElem.innerHTML = `<video width="100%"
// src="assets/animations/redstone.mov" autoplay loop muted playsinline></video>`;
// }
// }

var cookieScript = document.getElementById('cookie-script');

cookieScript.addEventListener('load', function () {
  window.cookieconsent.initialise({
    palette: {
      popup: {
        background: '#24355B',
        text: '#FFFFFF',
      },
      button: {
        background: '#5982F1',
        text: '#FFFFFF',
      },
    },
    showLink: false,
    theme: 'classic',
    content: {
      message: 'This site uses cookies to analyze traffic and offer a better browsing experience.',
      dismiss: 'Agree',
    },
  });
});

const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    console.log('elo');
    console.log(entry);
    entry.target.style.height = entry.target.offsetWidth * 0.56 + 'px';
  });
});

resizeObserver.observe(document.querySelector('#migration-video'));
