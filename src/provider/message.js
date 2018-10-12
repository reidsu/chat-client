import config from "./../config/index"
import qs from 'qs';
export default class MessageProvider {
  constructor() {
    this.host = config.host
  }
  getMessageList() {
    return fetch(`${this.host}/message`).then(async (res) => {
      const data = await res.json();
      return data;
    })
  }

  sendMessage(text) {
    const url = `${this.host}/message`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: qs.stringify({
        text
      })
    })
  }

  clearMessage() {
    const url = `${this.host}/message`;
    fetch(url, {
      method: "DELETE",
    })
  }
}

