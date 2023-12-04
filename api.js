
const apiUrl = "https://wedev-api.sky.pro/api/v2/asya-popova/comments";
const userUrl = "https://wedev-api.sky.pro/api/user/login";

export let userName;
export const setUserName = (newUserName) => {
  userName = newUserName;
};

 export let token;
 export const setToken = (newToken) => {
    token = newToken;
 };

 //get
export function getApi () {
   return fetch(apiUrl,{
 method:"GET",
 headers: {
 Authorization: `Bearer ${token}`,
  },
 })
 .then((response) => {
  return response.json();
 })

};
//post
export function postApi (name, text){
  return fetch (apiUrl,{
 method:"POST",
 body: JSON.stringify({
 name: name
 .replaceAll("&", "&amp;")
 .replaceAll("<", "&lt;")
 .replaceAll(">", "&gt;")
 .replaceAll('"', "&quot;"),
 text: text
 .replaceAll("&", "&amp;")
 .replaceAll("<", "&lt;")
 .replaceAll(">", "&gt;")
 .replaceAll('"', "&quot;"),
 headers: {
    Authorization: `Bearer ${token}`,
     },
 
 }),
 })
 .then ((response) => {
    if (response.status === 201){
     return response.json ();
    }
    if (response.status === 500 ){
     throw new Error ("Сервер упал");
    }
    if (response.status === 400){
     throw new Error ("Неверные данные ввода")
    }
    })
};

export function login (login, password){
   return fetch (userUrl,{
  method:"POST",
  body: JSON.stringify({
   login,
   password,
 }),
  })
   .then ((response) => {
     return response.json ();
   });
}