import { getApi } from "./api.js";
import { renderLogin } from "./loginPage.js";
import { renderblocks } from "./render.js";

const loaderComment = document.getElementById("loader-comment");

let blocks = [];
let token 
export function setToken (newToken) {
token = newToken
};

export function getToken () {
  return token;
  };


export const getComments = () => {
  // гет запрос
  getApi().then((responseData) => {
    // console.log("данные, которые вернул сервер", responseData.comments);
    let appComments = responseData.comments.map((block) => {
      return {
        name: block.author.name,
        comment: block.text,
        time: new Date(block.date).toLocaleString(),
        likes: block.likes,
        isLike: false,
      };
    });
    blocks = appComments;
    //console.log("преобразованные данные", appComments);
    if (loaderComment) {
      loaderComment.style.display = "none";
    }

    renderblocks(blocks);
  });
};
//getComments ();
renderLogin({ getComments });
