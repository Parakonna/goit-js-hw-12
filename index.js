import{a as b,S as v,i}from"./assets/vendor-DOgVoBmD.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const h of r.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&o(h)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();const w="45523262-d0ffc350dbb21d9b3ec29cf8d",S="https://pixabay.com/api/",m=async(t,e)=>{const a=new URLSearchParams({orientation:"horizontal",image_type:"photo",safesearch:!0,key:w,q:t,page:e,per_page:15}),{data:o}=await b.get(`${S}?${a}`);return o},p=t=>` <li class="gallery-card">
    <a href="${t.largeImageURL}">
    <img class="gallery-img"
    src="${t.webformatURL}" 
    alt="${t.tags}" />
    </a>
    <div class="wrapper">
    <ul class="img-content-wrapper">
      <li class="text-info">
        Likes<span class="number">${t.likes}</span>
      </li>
      <li class="text-info">
        Views<span class="number">${t.views}</span>
      </li>
      <li class="text-info">
        Comments<span class="number">${t.comments}</span>
      </li>
      <li class="text-info">
        Downloads<span class="number">${t.downloads}</span>
      </li>
    </ul>
  </div>
    </li>`;let n=1,d="";const f=new v(".js-gallery a",{overlay:!0,captionsData:"alt",overlayOpacity:.8,captionDelay:250,focus:!0}),y=document.querySelector(".js-search-form"),c=document.querySelector(".js-gallery"),g=document.querySelector(".js-loader"),E=document.querySelector(".js-search-input"),l=document.querySelector(".loader-more");function L(){g.classList.remove("is-hidden")}function u(){g.classList.add("is-hidden")}L();setTimeout(u,2e3);const P=async t=>{if(t.preventDefault(),c.innerHTML="",d=E.value.trim(),n=1,d===""){i.error({message:"Sorry",position:"topRight"}),u();return}try{const e=await m(d,n);if(e.hits.length===0){i.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),l.classList.add("is-hidden"),c.innerHTML="",y.reset();return}const a=e.hits.map(o=>p(o)).join("");c.innerHTML=a,f.refresh(),e.totalHits>15&&l.classList.remove("is-hidden"),e.totalHits<15&&(l.classList.add("is-hidden"),i.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."}))}catch(e){i.error({message:e.message})}finally{u()}},R=async t=>{L();try{n++;const e=await m(d,n),a=e.hits.map(o=>p(o)).join("");c.insertAdjacentHTML("beforeend",a),$(),f.refresh(),Math.ceil(e.totalHits/15)===n&&(l.classList.add("is-hidden"),i.info({message:"We're sorry, but you've reached the end of search results",position:"topRight"}))}catch(e){i.error({message:e.message})}finally{u()}},$=()=>{const{height:t}=c.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})};y.addEventListener("submit",P);l.addEventListener("click",R);
//# sourceMappingURL=index.js.map
