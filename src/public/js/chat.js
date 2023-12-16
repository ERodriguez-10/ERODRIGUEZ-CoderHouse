const socket = serverSocket();

// Forms selectors

const form = document.getElementById("chatForm");
const iMessage = document.getElementById("message");
const elChat = document.getElementById("chat");
const elUserTag = document.getElementById("userTag");

// Form submit event

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const iMessageTrim = iMessage.value.trim();

  const newMessageFromSocket = {
    user: elUserTag.textContent,
    message: iMessageTrim,
    date: formatDate(new Date().getTime()),
  };

  if (newMessageFromSocket) {
    socket.emit("newMessageClient", newMessageFromSocket);
    form.reset();
  }
});

// Socket.io events

socket.on("messageCreatedServer", (message) => {
  const cardMessage = document.createElement("li");
  const pDate = document.createElement("span");
  pDate.className = "date-bold";
  const pMessage = document.createElement("p");
  pMessage.className = "messageText";

  pDate.textContent = `${message.date} - ${message.user}: `;
  pMessage.appendChild(pDate);
  pMessage.insertAdjacentText("beforeend", message.message);

  cardMessage.appendChild(pMessage);

  elChat.appendChild(cardMessage);
  elChat.scrollTop = elChat.scrollHeight;
});

function formatDate(dateString) {
  let date = new Date(dateString);
  let day = String(date.getUTCDate()).padStart(2, "0");
  let month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
  let year = String(date.getUTCFullYear()).slice(2);
  let hours = String(date.getUTCHours()).padStart(2, "0");
  let minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

/*

socket.on("messageCreatedServer", (message) => {
  const cardMessage = document.createElement("li");
  cardMessage.textContent = `${message.date} - ${message.user}: ${message.message}`;
  elChat.appendChild(cardMessage);
  elChat.scrollTop = elChat.scrollHeight;
});

*/
