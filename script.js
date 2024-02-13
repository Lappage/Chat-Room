class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection("chats");
  }
  async addChat(message) {
    const now = new Date();
    const chat = {
      room: this.room,
      username: this.username,
      message,
      created: firebase.firestore.Timestamp.fromDate(now),
    };

    const response = await this.chats.add(chat);
    return response;
  }
}

const chatroom = new Chatroom("coding", "Lee");

chatroom.addChat("hello").then(() => {
  console.log("chat added");
});
