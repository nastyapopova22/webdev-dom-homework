
export function renderForm ({blocks ,listElement} ){
    const blocksHtml = blocks .map((block, index) =>{
        //  console.log (block);
        return `<li class="comment">
              <div class="comment-header">
                <div>
                   ${block.name} </div>
                <div>${block.time}</div>
              </div>
              <div class="comment-body"  data-comment ="${block.comment}" data-name ="${block.name}"  >
                <div class="comment-text" >
                  ${block.comment} 
                </div>
              </div>
              <div class="comment-footer">
                <div class="likes">
                  <span class="likes-counter">${block.likes} </span>
                  <button   class="like-button ${block.isLike ? '-active-like' : ''}"  data-index="${index}"></button>
                </div>
              </div>
            </li> `;
          })
          .join("");  //преобразуем массив строк в одну строчку с помощью метода join('') склеивает массив.
         listElement.innerHTML = blocksHtml;   
        
};
