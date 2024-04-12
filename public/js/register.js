const registerform = document.getElementById("registerForm");

registerform.addEventListener("submit", (e) => {
  e.preventDefault()

  const formData = new FormData(registerform)


  fetch("/api/sessions/register", {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
    });
});