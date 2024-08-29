import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchPhotos } from './js/pixabay.js';
import { createGalleryCard } from './js/render-functions.js';

let currentPaga = 1;
let searchedValue = "";

const lightbox = new SimpleLightbox('.js-gallery a', {
        overlay: true,
        captionsData: 'alt',
        overlayOpacity: 0.8,
        captionDelay: 250,
        focus: true,
      });

const searchFormEl = document.querySelector('.js-search-form');
const galleryEL = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.js-loader');
const inputEl = document.querySelector('.js-search-input')
const loadMoreEl = document.querySelector('.loader-more');


const onSearchFormSubmit = async event => {

    event.preventDefault();

    searchedValue = inputEl.value.trim();
    currentPaga = 1;

    if (searchedValue === '') {
    iziToast.error({
      message:
        'Sorry',
      position: 'topRight',
    });
          loaderEl.classList.add('is-hidden');
       loadMoreEl.classList.add('is-hidden');
        return;
    }

    galleryEL.innerHTML = '';
    loaderEl.classList.remove('is-hidden');
    loadMoreEl.classList.add('is-hidden');

    try {
        const data = await fetchPhotos(searchedValue, currentPaga)
        
        if (data.hits.length === 0) {
            iziToast.error({
                message:
                    'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
            });
              loaderEl.classList.add('is-hidden');
            loadMoreEl.classList.add('is-hidden');
            galleryEL.innerHTML = '';
            searchFormEl.reset();
            return;
        }
           
        const galleryCards = data.hits.map(imgDetals => createGalleryCard(imgDetals)).join('');
        galleryEL.innerHTML = galleryCards;
         
        lightbox.refresh();
   
        if (data.totalHits > 15) {
            loadMoreEl.classList.remove('is-hidden')
        }
        if (data.totalHits < 15) {
      loadMoreEl.classList.add('is-hidden');
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
        }
          loaderEl.classList.add('is-hidden');
    } catch (error) {
        iziToast.error({ message: error.message });
          loaderEl.classList.add('is-hidden');
    } finally {
    loaderEl.classList.add('is-hidden');
  }
};

const onLoadMore = async () => {
 
    currentPaga++;
    loaderEl.classList.remove('is-hidden');
    try {
        const data = await fetchPhotos(searchedValue, currentPaga)
         
        
            const galleryCards = data.hits.map(imgDetals => createGalleryCard(imgDetals)).join('');
        galleryEL.insertAdjacentHTML("beforeend", galleryCards);
        
        smoothScroll();  
        lightbox.refresh();

        if (Math.ceil(data.totalHits / 15) === currentPaga) {
            loadMoreEl.classList.add('is-hidden')
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results",
                position: 'topRight'
            })
        }
          loaderEl.classList.add('is-hidden');
} catch (error) {
        iziToast.error({ message: error.message }); 
          loaderEl.classList.add('is-hidden');
} finally {
    loaderEl.classList.add('is-hidden');
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