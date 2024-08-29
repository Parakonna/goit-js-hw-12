import{a as g,S as L,i as c}from"./assets/vendor-DOgVoBmD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const h of r.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&n(h)}).observe(document,{childList:!0,subtree:!0});function i(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=i(s);fetch(s.href,r)}})();const b="45523262-d0ffc350dbb21d9b3ec29cf8d",v="https://pixabay.com/api/",m=async(e,t)=>{const i=new URLSearchParams({orientation:"horizontal",image_type:"photo",safesearch:!0,key:b,q:e,page:t,per_page:15}),{data:n}=await g.get(`${v}?${i}`);return n},p=e=>` <li class="gallery-card">
    <a href="${e.largeImageURL}">
    <img class="gallery-img"
    src="${e.webformatURL}" 
    alt="${e.tags}" />
    </a>
    <div class="wrapper">
    <ul class="img-content-wrapper">
      <li class="text-info">
        Likes<span class="number">${e.likes}</span>
      </li>
      <li class="text-info">
        Views<span class="number">${e.views}</span>
      </li>
      <li class="text-info">
        Comments<span class="number">${e.comments}</span>
      </li>
      <li class="text-info">
        Downloads<span class="number">${e.downloads}</span>
      </li>
    </ul>
  </div>
    </li>`;let l=1,u="";const f=new L(".js-gallery a",{overlay:!0,captionsData:"alt",overlayOpacity:.8,captionDelay:250,focus:!0}),y=document.querySelector(".js-search-form"),d=document.querySelector(".js-gallery"),a=document.querySelector(".js-loader"),w=document.querySelector(".js-search-input"),o=document.querySelector(".loader-more"),S=async e=>{if(e.preventDefault(),u=w.value.trim(),l=1,u===""){c.error({message:"Sorry",position:"topRight"}),a.classList.add("is-hidden"),o.classList.add("is-hidden");return}d.innerHTML="",a.classList.remove("is-hidden"),o.classList.add("is-hidden");try{const t=await m(u,l);if(t.hits.length===0){c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),a.classList.add("is-hidden"),o.classList.add("is-hidden"),d.innerHTML="",y.reset();return}const i=t.hits.map(n=>p(n)).join("");d.innerHTML=i,f.refresh(),t.totalHits>15&&o.classList.remove("is-hidden"),t.totalHits<15&&(o.classList.add("is-hidden"),c.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})),a.classList.add("is-hidden")}catch(t){c.error({message:t.message}),a.classList.add("is-hidden")}finally{a.classList.add("is-hidden")}},E=async()=>{l++,a.classList.remove("is-hidden");try{const e=await m(u,l),t=e.hits.map(i=>p(i)).join("");d.insertAdjacentHTML("beforeend",t),P(),f.refresh(),Math.ceil(e.totalHits/15)===l&&(o.classList.add("is-hidden"),c.info({message:"We're sorry, but you've reached the end of search results",position:"topRight"})),a.classList.add("is-hidden")}catch(e){c.error({message:e.message}),a.classList.add("is-hidden")}finally{a.classList.add("is-hidden")}},P=()=>{const{height:e}=d.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})};y.addEventListener("submit",S);o.addEventListener("click",E);
//# sourceMappingURL=index.js.map
