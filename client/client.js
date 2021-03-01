const socket = io.connect(`http://localhost:4000/`, {
  'forceNew': true
});

socket.on('messages', (data) => {
  addMessages(data);
});

const addMessages = (data) => {
  const divMessages = document.getElementById('messages');

  const messages = data
    .map(
      ({ description, nickname }) =>
        `
      <div class='block-m'>
          <p id='nick' class='nickname'><strong>${nickname} </strong> <span class='description'>${description}</span></p>
      </div>
    `
    )
    .join(' ');

  divMessages.style.width = '40%';
  divMessages.style.border = '1px solid black';
  divMessages.style.marginBottom = '10px';
  divMessages.style.padding = '5px';
  divMessages.innerHTML = messages;
  divMessages.scrollTop = divMessages.scrollTopHeight;
};

const handleInput = () => {
  const description = document.getElementById('message').value;

  const nickname = document.getElementById('nickname').value;

  const send = document.getElementById('send');
  
  if (nickname.trim().length === 0) {
    send.setAttribute('disabled', 'true');
  } else {
    send.removeAttribute('disabled');
  }

  if (description.trim().length === 0) {
    send.setAttribute('disabled', 'true');
  } else {
    send.removeAttribute('disabled');
  }

};

document.getElementById('chatSubmit').addEventListener('submit', function (e) {
  e.preventDefault()
  const message = {
    description: document.getElementById('message').value,
    nickname: document.getElementById('nickname').value
  };

  document.getElementById('nickname').style.display = 'none';
  socket.emit('chatM', message);
  this.reset();
  return false;
});


