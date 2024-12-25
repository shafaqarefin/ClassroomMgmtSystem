import { postForm } from "../utils/postData.js";
import { loadComponent } from "../utils/fetchnav.js";

const postBlog = document.querySelector(".submit-blog-container");
const blogInputAction = document.querySelector(".blog-input-action");
const blogInput = document.querySelector(".blog-input");
const blogInputForm = document.querySelector(".blog-input-form");

let isSubmitDivVisible = false;

blogInput.addEventListener("click", (event) => {
  if (!isSubmitDivVisible) {
    // Create the 'Cancel' button
    const cancelButton = document.createElement("button");
    cancelButton.className = "blog-cancel";
    cancelButton.textContent = "Cancel";

    // Create the 'Post' button
    const postButton = document.createElement("button");
    postButton.className = "blog-submit";
    postButton.textContent = "Post";
    postButton.type = "submit";

    // Create the container div
    const submitDiv = document.createElement("div");
    submitDiv.className = "blog-submit-container";

    // Append the buttons to the container div
    submitDiv.appendChild(postButton);
    submitDiv.appendChild(cancelButton);

    // Append the container to the desired parent
    blogInputAction.appendChild(submitDiv);

    isSubmitDivVisible = true;

    // Add event listener for cancel button
    cancelButton.addEventListener("click", () => {
      submitDiv.remove();
      isSubmitDivVisible = false;
    });
  }
});

document.addEventListener("click", (event) => {
  if (
    isSubmitDivVisible &&
    !postBlog.contains(event.target) &&
    !blogInputAction.contains(event.target)
  ) {
    const submitDiv = document.querySelector(".blog-submit-container");
    if (submitDiv) {
      submitDiv.remove();
      isSubmitDivVisible = false;
    }
  }
});

// document.addEventListener("keydown", (event) => {
//   const submitDiv = document.querySelector(".blog-submit-container");

//   if (event.key === "Escape") {
//     submitDiv.remove();
//     isSubmitDivVisible = false;
//   }
// });

blogInputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(postForm(blogInputForm, "POST"));
  fetch("/post/", postForm(blogInputForm, "POST"))
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.message) {
        console.log("Sucessfully added blog");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

document.addEventListener("DOMContentLoaded", async () => {
  let content = await loadComponent("navbar.html");

  // Create a temporary container for the HTML string
  const tempContainer = document.createElement("div");
  tempContainer.innerHTML = content;

  // Remove the specific section
  const sectionToRemove = tempContainer.querySelector(".further-info-bar");
  if (sectionToRemove) {
    sectionToRemove.remove();
  }

  // Inject the modified content into the DOM
  document.querySelector(".header").innerHTML = tempContainer.innerHTML;
});
