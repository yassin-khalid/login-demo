const [signup] = document.getElementsByClassName("signup");
const [login] = document.getElementsByClassName("login");
const [tabs] = document.getElementsByClassName("tabs");
const [token] = document.getElementsByClassName("token");
const [reset] = document.getElementsByClassName("reset");
const btnTabsSignup = document.querySelector(".tabs > div:last-child");
const btnTabsLogin = document.querySelector(".tabs > div:first-child");
const forgetPassword = login.querySelector("form > div:last-of-type > a");
const btnReset = reset.querySelector("form > button");
const btnToken = token.querySelector("form > button");
const lnkResend = token.querySelector("form > div:last-of-type > a");
const { children: inputsToken } = token.querySelector("form > div:first-child");
const counter = token.querySelector("form > span");
let timer;
console.log(inputsToken);

const uis = [signup, login, token, reset];
tabs.addEventListener("click", (e) => {
  // change ui

  if (e.target === btnTabsLogin && !btnTabsLogin.classList.contains("active")) {
    uis.forEach((ui) => ui.classList.add("hide"));
    login.classList.remove("hide");
    // change the active tab
    [...tabs.children].forEach((child) => child.classList.remove("active"));
    e.target.classList.add("active");
  }
  if (
    e.target === btnTabsSignup &&
    !btnTabsSignup.classList.contains("active")
  ) {
    uis.forEach((ui) => ui.classList.add("hide"));
    signup.classList.remove("hide");
    // change the active tab
    [...tabs.children].forEach((child) => child.classList.remove("active"));
    e.target.classList.add("active");
    // clear timer
    clearInterval(timer);
    counter.innerHTML = "02:00";
  }
});

forgetPassword.addEventListener("click", (e) => {
  uis.forEach((ui) => ui.classList.add("hide"));
  reset.classList.remove("hide");
});

btnReset.addEventListener("click", (e) => {
  uis.forEach((ui) => ui.classList.add("hide"));
  token.classList.remove("hide");
  const countDownDate = new Date(new Date().getTime() + 2 * 60000);
  timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    counter.innerHTML = `${
      minutes === -1 ? "00" : minutes.toString().padStart(2, "0")
    }:${(seconds + 1).toString().padStart(2, "0")}`;
    if (distance <= 0) {
      clearInterval(timer);
    }
  }, 1000);
  setTimeout(() => {
    lnkResend.classList.remove("disabled");
  }, 2000 * 60);
});

lnkResend.addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target.classList.length === 0) {
    e.target.classList.add("disabled");
    const countDownDate = new Date(new Date().getTime() + 2 * 60000);
    timer = setInterval(() => {
      const now = new Date(new Date().getTime());
      const distance = countDownDate - now;
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      counter.innerHTML = `${
        minutes === -1 ? "00" : minutes.toString().padStart(2, "0")
      }:${(seconds + 1).toString().padStart(2, "0")}`;
      if (distance <= 0) {
        clearInterval(timer);
      }
    }, 1000);
    setTimeout(() => {
      e.target.classList.remove("disabled");
    }, 2000 * 60);
  }
});

[...inputsToken].forEach((input, index) =>
  input.addEventListener("input", (e) => {
    if (input.value.length > 1) {
      input.value = input.value.slice(0, 1);
    }
    if (input.value.length === 1) {
      if (index < [...inputsToken].length - 1) {
        inputsToken[index + 1].focus();
      }
    }
    if ([...inputsToken].every((input) => input.value.length > 0)) {
      btnToken.classList.remove("disabled");
    } else {
      btnToken.classList.add("disabled");
    }
  })
);
