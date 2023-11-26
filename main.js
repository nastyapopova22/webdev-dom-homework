import { getApi} from "./api.js";
import { postApi} from "./api.js";
import { renderForm} from "./render.js";

 const buttonElement = document.getElementById("add-button");
 const listElement = document.getElementById("List");
 const nameInputElement = document.getElementById("name-input");
 const textInputElement = document.getElementById("color-input");
 const today = new Date();
 const likeCount = document.querySelector('.like-counter');
 const addLoaderComment = document.getElementById("add-loader-comment");
 const loaderComment = document.getElementById("loader-comment");
 
 addLoaderComment.style.display = 'none';
 
 let bloks = [ ];
 
 const getComments = () => {  // гет запрос
  getApi ().then((responseData) => {
 // console.log("данные, которые вернул сервер", responseData.comments);
 let appComments = responseData.comments.map((blok) => {
   return {
     name: blok.author.name,
     comment: blok.text,
     time:new Date(blok.date).toLocaleString(),
     likes: blok.likes,
     isLike: false,
   }
 })
 bloks = appComments;
 //console.log("преобразованные данные", appComments);
 loaderComment.style.display = 'none';
 renderBloks();
 }); 
 }
 getComments ();
 
 const initEventListeners = () =>{
 const likesElements = document.querySelectorAll('.like-button');
 for (const likeElement of likesElements) {
 likeElement.addEventListener('click', () => {
   const index = likeElement.dataset.index;
   if (bloks[index].isLike === false){   //если не поставлен
     bloks[index].isLike = true; //ставим
     bloks[index].likes++; //и +1 к счетчику лайков
   } else { //в ином случае
     bloks[index].isLike = false; //убираем
     bloks[index].likes--; //вычитаем лайк
   }
  renderBloks(); 
 
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
 
 const renderBloks = () =>{ 
  renderForm ({bloksHtml,listElement});

  initEventListeners();
  commentEventListeners();    
 };
 getComments ();
 
 const timeNow = today.toLocaleString();

 function postComment() { // пост запрос
  postApi (
    {name: nameInputElement.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;"),
    text: textInputElement.value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;"),
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
 renderBloks();
 nameInputElement.value = "";
 textInputElement.value = "";
 });
 getComments();
