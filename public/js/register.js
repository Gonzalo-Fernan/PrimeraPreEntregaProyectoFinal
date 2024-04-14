const registerform = document.getElementById("registerForm");

registerform.addEventListener("submit", (e) => {
  e.preventDefault()

  const formData = new FormData(registerform)
 
  const obj = {};
  formData.forEach((value, key) => (obj[key] = value))

  console.log(obj, formData);
  fetch("/api/sessions/register", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
    })
});