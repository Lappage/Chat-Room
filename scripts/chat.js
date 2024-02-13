class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection("Chats");
    this.unsub;
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
  getChats(callback) {
    this.unsub = this.chats
      .where("room", "==", this.room)
      .orderBy("created")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            callback(change.doc.data());
          }
        });
      });
  }

  updateName(username) {
    this.username = username;
    localStorage.setItem("username", username);
  }
  updateRoom(room) {
    this.room = room;
    if (this.ubsub) {
      this.unsub();
    }
  }
}
