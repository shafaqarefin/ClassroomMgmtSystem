export function loadComponent(filePathHTML) {
  return fetch(filePathHTML)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load " + filePathHTML);
      }
      return response.text(); // Return the promise
    })
    .then((html) => {
      console.log(html); // Log the resolved HTML here
      return html; // Ensure the HTML is returned
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
