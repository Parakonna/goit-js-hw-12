import{a as L,i,S as p}from"./assets/vendor-DOgVoBmD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const b="45523262-d0ffc350dbb21d9b3ec29cf8d",v="https://pixabay.com/api/",h=async(r,t)=>{const a=new URLSearchParams({orientation:"horizontal",image_type:"photo",safesearch:!0,key:b,q:r,page:t,per_page:15}),{data:o}=await L.get(`${v}?${a}`);return o},f=r=>` <li class="gallery-card">
    <a href="${r.largeImageURL}">
    <img class="gallery-img"
    src="${r.webformatURL}" 
    alt="${r.tags}" />
    </a>
    <div class="wrapper">
    <ul class="img-content-wrapper">
      <li class="text-info">
        Likes<span class="number">${r.likes}</span>
      </li>
      <li class="text-info">
        Views<span class="number">${r.views}</span>
      </li>
      <li class="text-info">
        Comments<span class="number">${r.comments}</span>
      </li>
      <li class="text-info">
        Downloads<span class="number">${r.downloads}</span>
      </li>
    </ul>
  </div>
    </li>`;let n=1,l="";const c=document.querySelector(".js-search-form"),u=document.querySelector(".js-gallery"),y=document.querySelector(".js-loader"),m=document.querySelector(".loader-more");function w(){y.classList.remove("is-hidden")}function S(){y.classList.add("is-hidden")}w();setTimeout(S,2e3);const x=async r=>{r.preventDefault(),l=c.elements.user_query.value.trim(),n=1;try{const t=await h(l,n);if(l===""){i.warning({title:"Caution",message:"Input field must not be empty",position:"topLeft"}),u.innerHTML="",c.reset();return}if(t.hits.length===0){i.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),u.innerHTML="",c.reset();return}console.log(t);const a=t.hits.map(e=>f(e)).join("");u.innerHTML=a,g(),new p(".js-gallery a",{overlay:!0,captionsData:"alt",overlayOpacity:.8,captionDelay:250,focus:!0}).refresh(),t.totalHits>15&&m.classList.remove("is-hidden")}catch(t){i.error({message:t.message})}},E=async r=>{r.preventDefault(),l=c.elements.user_query.value.trim(),n=1;try{const t=await h(l,n),a=t.hits.map(e=>f(e)).join("");u.insertAdjacentHTML("beforeend",a),g(),new p(".js-gallery a",{overlay:!0,captionsData:"alt",overlayOpacity:.8,captionDelay:250,focus:!0}).refresh(),Math.ceil(t.totalHits/15)===n&&(m.classList.add("is-hidden"),i.info({message:"We're sorry, but you've reached the end of search results",position:"topRight"}))}catch(t){i.error({message:t.message})}},g=()=>{const{height:r}=u.firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})};c.addEventListener("submit",x);m.addEventListener("click",E);
//# sourceMappingURL=index.js.map
