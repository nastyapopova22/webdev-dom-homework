export function getApi () {
   return fetch("https://wedev-api.sky.pro/api/v1/asya-popova/comments",{
 method:"GET",
 
 })
 .then((response) => {
  return response.json();
 })

};

export function postApi ({name, text}){
  return fetch ("https://wedev-api.sky.pro/api/v1/asya-popova/comments",{
 method:"POST",
 body: JSON.stringify({
 name: name,
 text: text,
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