const requestURL = "https://dog.ceo/api/breeds/image/random";
let link = null;
const img = document.querySelector("img");
const start = document.getElementById("start");

function sendRequest(method, url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.responseType = "json";

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject(xhr.response);
    };

    xhr.send();
  });
}

const checkFoto = () => {
  if (parseInt(img.width) > parseInt(screen.width)) {
    img.style.width = screen.width - 20 + "px";
    img.style.height = "auto";
  }
};

const changeFoto = () => {
  sendRequest("GET", requestURL)
    .then((data) => {
      link = data["message"];
      img.src = link;
      checkFoto();
    })
    .catch((err) => console.log(err));
};

changeFoto();

setTimeout(() => {
  checkFoto();
}, 500);

start.onmouseenter = () => {
  start.style.opacity = "0.8";
};

start.onclick = () => {
  changeFoto();
};

start.onmouseleave = () => {
  setTimeout(() => {
    start.style.opacity = "1";
  }, 250);
};
