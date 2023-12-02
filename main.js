import { getApi,postApi} from "./api.js";
import { renderLogin } from "./loginPage.js";
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
 
 let blocks  = [ ];
 
 const getComments = () => {  // гет запрос
  getApi ().then((responseData) => {
 // console.log("данные, которые вернул сервер", responseData.comments);
 let appComments = responseData.comments.map((block) => {
   return {
     name: block.author.name,
     comment: block.text,
     time:new Date(block.date).toLocaleString(),
     likes: block.likes,
     isLike: false,
   }
 })
 blocks  = appComments;
 //console.log("преобразованные данные", appComments);
 loaderComment.style.display = 'none';
 renderblocks ();

 }); 
 }
 getComments ();
 
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
 renderblocks ();
 nameInputElement.value = "";
 textInputElement.value = "";
 });
 getComments();
