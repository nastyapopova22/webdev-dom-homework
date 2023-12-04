import { postApi } from "./api.js";

export function renderForm ({blocks ,listElement} ){
    const appElement = document.getElementById("app");
    
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
          .join(""); 
        
          const appHtml = `<div class="container">
          <div id="loader-comment">Комментарии загружаются...</div>
          <ul id="List" class="comments">${blocksHtml} 
    <!--список рендерится из js-->
          </ul>
          <div id="add-loader-comment">Загружаю комментарий, пожалуйста подождите...</div>
          <div class="add-form" id="add-form">
            <input id="name-input"
              type="text"
              class="add-form-name"
              placeholder="Введите ваше имя"
              
          ></input>
            <textarea 
            id="color-input"
              class="add-form-text"
              placeholder="Введите ваш коментарий"
              rows="4"
            ></textarea>
            <div class="add-form-row">
              <button id="add-button" class="add-form-button">Написать</button>
            </div>
          </div>
        </div>`;
          
         appElement.innerHTML = appHtml;  

         const buttonElement = document.getElementById("add-button");
        
         const nameInputElement = document.getElementById("name-input");
         const textInputElement = document.getElementById("color-input");
         const today = new Date();
         const addLoaderComment = document.getElementById("add-loader-comment");
         const timeNow = today.toLocaleString();
         const listElement = document.getElementById("List");

         const initEventListeners = () =>{
            const likesElements = document.querySelectorAll('.like-button');
            for (const likeElement of likesElements) {
            likeElement.addEventListener('click', () => {
              const index = likeElement.dataset.index;
              if (blocks [index].isLike === false){   //если не поставлен
                blocks [index].isLike = true; //ставим
                blocks [index].likes++; //и +1 к счетчику лайков
              } else { //в ином случае
                blocks [index].isLike = false; //убираем
                blocks [index].likes--; //вычитаем лайк
              }
             renderblocks (); 
            
            });
            }
            };
            initEventListeners();
            
            
            const commentEventListeners = () =>{
            const commentsElements = document.querySelectorAll(".comment-body");
            for (const commentElement of commentsElements) {
            commentElement.addEventListener('click', (event) => {
              event.stopPropagation();
              const thisComment =  commentElement.dataset.comment;
              const thisName = commentElement.dataset.name;
              textInputElement.value += `${thisName} : ${thisComment}`;
            });
            }
            };
            
            const renderblocks  = () =>{ 
             renderForm ({blocks ,listElement});
           
             initEventListeners();
             commentEventListeners();    
            };
            getComments ();
         addLoaderComment.style.display = 'none';
         buttonElement.addEventListener("click", () => {  // создаем клик для обработки пост запроса
 
            nameInputElement.classList.remove("error"); // пустое поле 
           if (nameInputElement.value === "" || textInputElement.value === "") {  
             console.log ("error")
             nameInputElement.classList.add("error");
           return;
           }
          
           document.querySelector('.add-form').style.display = 'none';
           addLoaderComment.style.display = "block";
          
           postComment();
           renderblocks ();
           nameInputElement.value = "";
           textInputElement.value = "";
           });          
           function postComment() { // пост запрос
            postApi (
              {
                name: nameInputElement.value, 
                text: textInputElement.value
              }
            )
           .then(() => {
           return getComments();
           })
           .then (() => {
           document.getElementById("add-form").style.display = 'flex';
           addLoaderComment.style.display = 'none';
           nameInputElement.value = "";
           textInputElement.value = "";
           }).catch((error) => {
           document.getElementById("add-form").style.display = 'flex';
           addLoaderComment.style.display = 'none';
           if (error.message === "Сервер сломался") {
               alert('Сервер сломался, попробуйте позже');
              }
            if (error.message === "Плохой запрос") {
                alert('Имя и комментарий должны быть не короче 3х символов');
              }
            else {
               alert("Кажется у вас сломался интернет, попробуйте позже")
              }    
           console.log(error);
           });
           };
};


// tasksHtml = blockHtml