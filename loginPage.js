import { login} from "./api.js";


export const renderLogin = ({getComments}) => {
 const appElement = document.getElementById("app");
  //const appElement = document.querySelector('.container');
  const loginHtml = 
    ` <div class="form">
      <h3 class="form-title">Форма входа</h3>
      <div class="form-row">
        <input type="text" id="login-input" class="input" placeholder="Логин" />
        <input
          type="text"
          id="password-input"
          class="input"
          placeholder="Пароль"
        />
      </div>
      <br />
      <button class="button" id="login-button">Войти</button>
      <a href="index.html" id="link-to-tasks">Авторизоваться</a>
    </div>
    `;

  appElement.innerHTML = loginHtml;
  const buttonInputElement = document.getElementById("login-button");  // 2. Создаем кнопку Войти 
  const loginInputElement = document.getElementById("login-input");// 4.создаем переменные, которые вложим в функцию клика
  const passwordInputElement = document.getElementById("password-input");// 4.создаем переменные
 
 // 2.1. навешиваем обработку клика

 buttonInputElement.addEventListener("click", () => { 
  login({ // 3.вызываем функцию
      login: loginInputElement.value,
      password: passwordInputElement.value,
    }).then (()=>{
        getComments();
      });
    });
};