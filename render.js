
export function renderForm ({bloksHtml,listElement} ){
    const bloksHtml = bloks.map((blok, index) =>{
        //  console.log (blok);
        return `<li class="comment">
              <div class="comment-header">
                <div>
                   ${blok.name} </div>
                <div>${blok.time}</div>
              </div>
              <div class="comment-body"  data-comment ="${blok.comment}" data-name ="${blok.name}"  >
                <div class="comment-text" >
                  ${blok.comment} 
                </div>
              </div>
              <div class="comment-footer">
                <div class="likes">
                  <span class="likes-counter">${blok.likes} </span>
                  <button   class="like-button ${blok.isLike ? '-active-like' : ''}"  data-index="${index}"></button>
                </div>
              </div>
            </li> `;
          })
          .join("");  //преобразуем массив строк в одну строчку с помощью метода join('') склеивает массив.
         listElement.innerHTML = bloksHtml;   
        
};
