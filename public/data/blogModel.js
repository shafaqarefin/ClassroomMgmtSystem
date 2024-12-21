export function fetchAllPostsByUserId() {
  fetch("http://localhost:3000/post/")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // Check the response data
      if (data.postsByUserId) {
        const postsByUserId = data.postsByUserId;
        return postsByUserId;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
