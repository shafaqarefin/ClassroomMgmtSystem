import { postForm } from "../utils/postData.js";

const contactForm = document.querySelector(".login-form");
contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  fetch("/user/login", postForm(contactForm, "POST"))
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.message) {
        window.location.href = "dashboard.html";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
