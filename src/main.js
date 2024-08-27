import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchPhotos } from './js/pixabay.js';
import { createGalleryCard } from './js/render-functions.js';

let currentPaga = 1;
let searchedValue = "";


const searchFormEl = document.querySelector('.js-search-form');
const galleryEL = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.js-loader');
const loadMoreEl = document.querySelector('.loader-more');

function showLoader() {
  loaderEl.classList.remove('is-hidden');
}
function hideLoader() {
  loaderEl.classList.add('is-hidden');
}

showLoader();
setTimeout(hideLoader, 2000);

const onSearchFormSubmit = async event => {
    event.preventDefault();
 searchedValue = searchFormEl.elements.user_query.value.trim();
    currentPaga = 1;
    try {
        const data = await fetchPhotos(searchedValue, currentPaga)
        if (searchedValue === '') {
    iziToast.warning({
      title: 'Caution',
      message: 'Input field must not be empty',
      position: 'topLeft',
    });
            galleryEL.innerHTML = '';
            searchFormEl.reset();
    return;
  }
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
          galleryEL.innerHTML = '';
        searchFormEl.reset();
        return;
      }
            console.log(data);
            const galleryCards = data.hits.map(imgDetals => createGalleryCard(imgDetals)).join('');
        galleryEL.innerHTML = galleryCards;
        
        smoothScroll();
         
         const lightbox = new SimpleLightbox('.js-gallery a', {
        overlay: true,
        captionsData: 'alt',
        overlayOpacity: 0.8,
        captionDelay: 250,
        focus: true,
      });
        lightbox.refresh();
        if (data.totalHits > 15) {
        loadMoreEl.classList.remove('is-hidden')
    }
} catch (error) {
    iziToast.error({ message: error.message}); 
}
}

const onLoadMore = async (event) => {
    event.preventDefault();
 searchedValue = searchFormEl.elements.user_query.value.trim();
    currentPaga = 1;
    try {
        const data = await fetchPhotos(searchedValue, currentPaga)

            const galleryCards = data.hits.map(imgDetals => createGalleryCard(imgDetals)).join('');
        galleryEL.insertAdjacentHTML("beforeend", galleryCards);
        
        smoothScroll();
         
         const lightbox = new SimpleLightbox('.js-gallery a', {
        overlay: true,
        captionsData: 'alt',
        overlayOpacity: 0.8,
        captionDelay: 250,
        focus: true,
      });
        lightbox.refresh();
        if (Math.ceil(data.totalHits / 15) === currentPaga) {
            loadMoreEl.classList.add('is-hidden')
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results",
                position: 'topRight'
            })
    }
} catch (error) {
    iziToast.error({ message: error.message}); 
}
}

const smoothScroll = () => {
    const { height } = galleryEL.firstElementChild.getBoundingClientRect();
    window.scrollBy({
  top: height * 2,
  behavior: "smooth",
});
}

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreEl.addEventListener('click', onLoadMore)