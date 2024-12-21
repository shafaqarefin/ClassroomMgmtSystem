export function postForm(form, method) {
  const formObject = {};
  const formData = new FormData(form); //this will contain all input fields values with names
  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  const requestOptions = {
    method: method,
    credentials: "include",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formObject),
  };

  return requestOptions;
}
