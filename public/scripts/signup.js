const contactForm = document.querySelector(".signup-form");
contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const formObject = {};

  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  console.log(formObject);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formObject),
  };

  fetch("http://localhost:3000/user/signup", requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // Check the response data
      if (data.message) {
        window.location.href = "index.html";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
