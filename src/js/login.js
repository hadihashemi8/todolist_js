const signFormTemplate = $.getElementById("sign-form");
const exitSignFormBtn = $.getElementById("Exit-Sign-Form");
const signBtnSwitch = $.getElementById("sign-btn-switch");
const loginBtnSwitch = $.getElementById("login-btn-switch");
const signPage = $.getElementById("sign-page");
const loginPage = $.getElementById("login-page");
const showPassword = $.querySelectorAll(".show-icon");

// show password
showPassword.forEach((icon) => {
  icon.addEventListener("mousedown", () => {
    if (icon.previousElementSibling.type == "password") {
      icon.previousElementSibling.setAttribute("type", "text");
    }
  });
  icon.addEventListener("mouseup", (e) => {
    if (icon.previousElementSibling.type == "text") {
      icon.previousElementSibling.setAttribute("type", "password");
    }
  });
});

// switch sign form to login
signBtnSwitch.addEventListener("click", () => {
  signPage.classList.replace("-left-[110%]", "left-0");
  loginPage.classList.replace("left-0", "-left-[110%]");
  signBtnSwitch.classList.replace("bg-btn-Color", "bg-white");
  signBtnSwitch.classList.replace("text-white", "text-btn-Color");
  loginBtnSwitch.classList.replace("bg-white", "bg-btn-Color");
  loginBtnSwitch.classList.replace("text-btn-Color", "text-white");
});

loginBtnSwitch.addEventListener("click", () => {
  loginPage.classList.replace("-left-[110%]", "left-0");
  signPage.classList.replace("left-0", "-left-[110%]");
  loginBtnSwitch.classList.replace("bg-btn-Color", "bg-white");
  loginBtnSwitch.classList.replace("text-white", "text-btn-Color");
  signBtnSwitch.classList.replace("bg-white", "bg-btn-Color");
  signBtnSwitch.classList.replace("text-btn-Color", "text-white");
});

// close sign form
exitSignFormBtn.addEventListener("click", () => {
  signFormTemplate.classList.replace("top-0", "-top-full");
});

// load sign form
EnglishloginBtn.addEventListener("click", () => {
  signFormTemplate.classList.replace("-top-full", "top-0");
});

persianloginBtn.addEventListener("click", () => {
  signFormTemplate.classList.replace("-top-full", "top-0");
});









// sign up part
let signUsernameInput = $.querySelector("#sign-username");
let signPasswordInput = $.querySelector("#sign-password");
let signConfirmPass = $.querySelector("#sign-confirm-pas");
let errorAlert = $.querySelector("#error-text");
const signBtn = $.querySelector("#sign-btn");
let signForm = $.querySelector(".sign-form");

signUsernameInput.addEventListener("keyup", (e) => {
  if (signUsernameInput.value.length < 4) {
    errorAlert.innerHTML = "should be more than 4 character";
    errorAlert.classList.replace("hidden", "block");
  } else if (signUsernameInput.value.length >= 4) {
    errorAlert.classList.replace("block", "hidden");
  }
});

signForm.addEventListener("submit", function (e) {
  e.preventDefault();

  fetch(`http://localhost:3000/users`)
    .then((res) => res.json())
    .then((data) =>
      data.some((d) => {
        return d["username"] == signUsernameInput.value;
      })
    )
    .then((g) => (g ? hasUserAlert() : checkValue()));
  // successfulSignAlert()
});

function checkValue() {
  let signUsernameInputValue = signUsernameInput.value;
  let signPasswordInputValue = signPasswordInput.value;
  let signConfirmPassValue = signConfirmPass.value;

  if (
    !signUsernameInputValue == "" &&
    signPasswordInputValue !== signConfirmPassValue
  ) {
    errorAlert.classList.replace("hidden", "block");
    errorAlert.innerHTML = "check your password";
    signPasswordInput.classList.replace("bg-transparent", "bg-red-600");
    signConfirmPass.classList.replace("bg-transparent", "bg-red-600");
  } else if (
    signUsernameInputValue == "" &&
    signPasswordInputValue == signConfirmPassValue &&
    !signPasswordInputValue == "" &&
    !signConfirmPassValue == ""
  ) {
    signUsernameInput.classList.replace("bg-transparent", "bg-red-600");
  } else if (
    !signUsernameInputValue == "" &&
    signUsernameInputValue.length > 4 &&
    signPasswordInputValue == "" &&
    signConfirmPassValue == ""
  ) {
    signPasswordInput.classList.replace("bg-transparent", "bg-red-600");
    signConfirmPass.classList.replace("bg-transparent", "bg-red-600");
  } else if (
    signUsernameInputValue == "" ||
    (signUsernameInputValue.length < 4 &&
      signPasswordInputValue == "" &&
      signConfirmPassValue == "")
  ) {
    signUsernameInput.classList.replace("bg-transparent", "bg-red-600");
    signPasswordInput.classList.replace("bg-transparent", "bg-red-600");
    signConfirmPass.classList.replace("bg-transparent", "bg-red-600");
  } else if (
    !signUsernameInputValue == "" &&
    signUsernameInputValue.length > 4 &&
    signPasswordInputValue == signConfirmPassValue
  ) {
    saveUserData();
  }
}

function saveUserData() {
  let userName = signUsernameInput.value;
  let password = signPasswordInput.value;

  let userInfo = {
    username: userName,
    userpassword: password,
  };
  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
}

function hasUserAlert() {
  errorAlert.classList.replace("hidden", "block");
  errorAlert.innerHTML = "this userName has be selected";
}

function successfulSignAlert() {
  errorAlert.classList.replace("text-red-700", "text-green-500");
  errorAlert.classList.replace("hidden", "block");
  errorAlert.innerHTML = "successful sign up";
}




// LOGIN PART
let loginUsernameInput = $.getElementById('login-username-input')
let loginPassInput = $.getElementById('login-pass-input')
let loginError = $.getElementById('login-error-text')
const loginBtn = $.getElementById('login-btn')


let isLogin = false


loginBtn.addEventListener('click' , (e) => {
e.preventDefault()

let userData = {
  username : loginUsernameInput.value,
  userpassword : loginPassInput.value
}


checkUserHas(userData)
})

async function checkUserHas(userData){
  let x = []

 await fetch(`http://localhost:3000/users`)
  .then((res) => res.json())
   .then(data => x.push(data))

   let hasUser =  x[0].find(user => {
   return  user.username == userData.username 
  })

  let getUserPass 
  
  if(hasUser){
    getUserPass = hasUser.userpassword
  }
  
  
  if(hasUser && userData.userpassword == getUserPass){
    isLogin = true
    setIsLoginToLocal(isLogin)
    successLogin(hasUser)
   }else if(hasUser && userData.userpassword !== getUserPass){
    isLogin = false
    loginError.innerHTML = 'this user not found'
    loginError.classList.replace("hidden", "block");
  }else if(loginUsernameInput.value == '' && loginPassInput.value == ''){
    isLogin = false
    loginError.innerHTML = 'insert the coract value'
    loginError.classList.replace("hidden", "block");
   }else if(loginUsernameInput.value == '' || loginPassInput.value == ''){
    isLogin = false
    loginError.innerHTML = 'Fill The All Inputs'
    loginError.classList.replace("hidden", "block");
   }else if(!hasUser || userData.userpassword !== getUserPass ){
    isLogin = false
    loginError.innerHTML = 'this user not found'
    loginError.classList.replace("hidden", "block");
   }
}


function setIsLoginToLocal(islogin){
localStorage.setItem( 'islogin' , JSON.stringify( islogin))
}

function getIsLoginFromLocal(){
  let getIsLogin = JSON.parse(localStorage.getItem('islogin'))
return getIsLogin
}


function successLogin(hasUser){
  signFormTemplate.classList.replace("top-0", "-top-full");
  let checkLogin =  getIsLoginFromLocal()
  console.log(checkLogin);
  if(checkLogin){
 $.getElementById('user-info').classList.replace('hidden' , 'flex')
   EnglishloginBtn.style.display = 'none'
  persianloginBtn.style.display = 'none'
 $.getElementById('user-name').innerHTML = hasUser.username
  }
}


