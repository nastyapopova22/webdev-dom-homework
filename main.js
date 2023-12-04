import { getApi,} from "./api.js";
import { renderLogin } from "./loginPage.js";



const loaderComment = document.getElementById("loader-comment");

 
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
 //getComments ();
 renderLogin ({getComments});
 
 
 ;
