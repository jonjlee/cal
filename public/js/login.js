import { auth, countUserDepts } from "./model/model.js";
import { nextFieldOnEnter, submitOnEnter } from "./util.js";

const REGISTER_ERROR_GENERIC =
  "Error registering user. Please contact administrator.";
const REGISTER_ERROR_WEAK_PASSWORD =
  "Password should be at least 6 characters and numbers.";
const REGISTER_ERROR_ALREADY_REGISTERED =
  'User already exists. <a href="#" onclick="loginEmail.value = registerEmail.value; loginTab.click(); loginPassword.focus();">Login instead.</a>';
document.on("DOMContentLoaded", () => {
  // Handlers for login form
  loginEmail.on("keypress", nextFieldOnEnter(loginPassword));
  loginPassword.on("keypress", submitOnEnter(loginBtn));
  loginBtn.on("click", login);

  // Register form
  registerName.on("keypress", nextFieldOnEnter(registerEmail));
  registerEmail.on("keypress", nextFieldOnEnter(registerPassword));
  registerPassword.on("keypress", submitOnEnter(registerBtn));
  registerBtn.on("click", register);
});

// Login - login button
function login() {
  // Hide any existing alert
  loginInfoAlert.classList.remove("d-none");
  loginErrorAlert.classList.add("d-none");

  // Supabase login
  auth
    .signInWithPassword({
      email: loginEmail.value,
      password: loginPassword.value,
    })
    .then(async ({ data, error }) => {
      if (error) {
        // Show static error message
        loginInfoAlert.classList.add("d-none");
        loginErrorAlert.classList.remove("d-none");
        if (error?.message != "Invalid login credentials") {
          console.log(error);
        }
      } else {
        // Redirect based on whether user is a member of any depts
        if ((await countUserDepts()).count) {
          window.location.href = "/cal.html";
        } else {
          window.location.href = "/dept.html";
        }
      }
    });
}

// Register - register button
function register() {
  // Hide any existing alert
  registerInfoAlert.classList.remove("d-none");
  registerErrorAlert.classList.add("d-none");

  // Supabase register
  auth
    .signUp({
      email: registerEmail.value,
      password: registerPassword.value,
      options: {
        data: {
          name: registerName.value,
        },
      },
    })
    .then(async ({ data, error }) => {
      if (error) {
        // Show static error message
        registerInfoAlert.classList.add("d-none");
        registerErrorAlert.classList.remove("d-none");
        registerErrorAlert.innerText = REGISTER_ERROR_GENERIC;

        // Provide a more concise error message to the user for known errors
        if (error.__isAuthError) {
          if (error.code == "weak_password") {
            registerErrorAlert.innerText = REGISTER_ERROR_WEAK_PASSWORD;
          } else if (error.message == "User already registered") {
            registerErrorAlert.innerHTML = REGISTER_ERROR_ALREADY_REGISTERED;
          } else if (error.message) {
            registerErrorAlert.innerText = error.message;
          }
        }
        console.log(error);
      } else {
        // Redirect to department list
        window.location.href = "/dept.html";
      }
    });
}
