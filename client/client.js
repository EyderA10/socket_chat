const socket = io.connect("https://n0wld.sse.codesandbox.io/", {
  forceNew: true
});

socket.on("messages", (data) => {
  addMessages(data);
});

const addMessages = (data) => {
  const divMessages = document.getElementById("messages");

  const messages = data
    .map(
      ({ description, nickname }) =>
        `
      <div class="block-m">
          <p id="nick" class="nickname"><strong>${nickname}:</strong> <span class="description">${description}</span></p>
      </div>
    `
    )
    .join(" ");

  divMessages.style.width = "70%";
  divMessages.style.border = "1px solid black";
  divMessages.style.marginBottom = "10px";
  divMessages.style.padding = "5px";
  divMessages.innerHTML = messages;
  divMessages.scrollTop = divMessages.scrollTopHeight;
};

const handleInput = () => {
  const description = document.getElementById("message").value;

  const nickname = document.getElementById("nickname").value;

  const send = document.getElementById("send");

  if (description.trim().length === 0 || nickname.trim().length === 0) {
    send.setAttribute("disabled", "true");
  } else {
    send.removeAttribute("disabled");
  }
};

const form = document.getElementById("chatSubmit");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const description = document.getElementById("message").value;

  const nickname = document.getElementById("nickname").value;

  const message = {
    description,
    nickname
  };

  nickname.style.display = "none";
  socket.emit("chatM", message);
  form.reset();
});
