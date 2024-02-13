const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMsg = document.querySelector(".update-msg");
const rooms = document.querySelector(".chatrooms");

newChatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom
    .addChat(message)
    .then(() => newChatForm.reset())
    .catch((err) => {
      console.log(err);
    });
});

newNameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = newNameForm.name.value.trim();
  chatroom.updateName(name);
  newNameForm.name.setAttribute("placeholder", name);
  newNameForm.reset();

  updateMsg.innerHTML = `<p class="lead text-center mt-2">Username has been updated to ${name}</p>`;
  setTimeout(() => (updateMsg.innerHTML = ""), 3000);
});

rooms.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute("id"));
    chatroom.getChats((chat) => chatUI.render(chat));
  }
});

const username = localStorage.username ? localStorage.username : "Anon";
newNameForm.name.setAttribute("placeholder", username);

const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("general", username);

chatroom.getChats((data) => chatUI.render(data));
