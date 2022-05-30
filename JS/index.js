"use strict";
const productTitle = document.querySelectorAll(".product__title");
const productDescription = document.querySelectorAll(".product__description");
const productBtn = document.querySelectorAll(".product__btn");

const disablesScroll=()=>{
  document.body.scrollPosition = window.scrollY
  document.body.style.cssText=`
  overlow:hidden;
  position:fixed;
  top:-${ document.body.scrollPosition}px;
   left:0;
   height:100vh;
   width:100vh;
  `
}
const enabledScroll=()=>{
  window.scroll({top: document.body.scrollPosition})
  document.body.style.cssText='';
}


const createElem = (tag, attr) => {
  const elem = document.createElement(tag);
  return Object.assign(elem, { ...attr });
};

const createModal = (title, description) => {
  const overlayElem = createElem("div", { className: "modal" });
  const modalElem = createElem('div',{className:'modal__block'});
  const modalContainerElem= createElem('div',{className:'modal__container'});
  const titleElem = createElem('h2',{
    className:'modal__title',
    textContent:`Заказать ${title}`
  });

  const descriptionELem = createElem('p',{
    className:'modal__description',
    textContent:description
  });

  const formElem = createElem('form',{
    className:'modal__form',
    method:'post',
    action:'https://jsonplaceholder.typicode.com/posts',
    id:'order'
  });

  const nameLabelElem = createElem('label',{className:'modal__label'});
  const nameSpanElem = createElem('span',{className:'modal__text',textContent:'Имя'});
  const nameInputElem = createElem('input',{
    className:'modal__input',
    placeholder:'Введите ваше имя',
    name:'name',
    required:true
  });


  const phoneLabelElem = createElem('label',{className:'modal__label'});
  const phoneSpanElem = createElem('span',{className:'modal__text',textContent:'Телефон'});
  const phoneInputElem = createElem('input',{
    className:'modal__input',
    placeholder:'Введите ваш телефон',
    name:'phone',
    required:true
  });
  const btnSumbit = createElem('button',{className:'modal__btn',textContent:'заказать',type:'sunmit'});
  btnSumbit.setAttribute('form','order');
  const hideInput = createElem('input',{type:'hidden',name:'product',value:title});
  const closeModalbtn = createElem('button',{
    className:'modal__close',
    innerHTML:`
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.75 8.0125L21.9875 6.25L15 13.2375L8.0125 6.25L6.25 8.0125L13.2375 15L6.25 21.9875L8.0125 23.75L15 16.7625L21.9875 23.75L23.75 21.9875L16.7625 15L23.75 8.0125Z" fill="#18171A"/>
    </svg>
    `
  });
  overlayElem.addEventListener('click',e=>{
    const target = e.target;
    if(target===overlayElem || target.closest('.modal__close')){
      overlayElem.remove();
      enabledScroll()
    }
  })

  nameLabelElem.append(nameSpanElem,nameInputElem);

  phoneLabelElem.append(phoneSpanElem,phoneInputElem);

  formElem.append(nameLabelElem,phoneLabelElem,hideInput);

  modalContainerElem.append(titleElem,descriptionELem,formElem,btnSumbit,closeModalbtn);

  modalElem.append(modalContainerElem);

  overlayElem.append(modalElem);
  disablesScroll();
  document.body.append(overlayElem)
};

for (let i = 0; i < productBtn.length; i++) {
  productBtn[i].addEventListener("click", () => {
    const title = productTitle[i].textContent;
    const description = productDescription[i].textContent;

   createModal(title, description);
  });
}
