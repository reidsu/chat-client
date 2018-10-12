import React, { Component } from 'react';
import moment from "moment";
import io from 'socket.io-client';
import {msgPro} from "./provider/index";
import config from "./config/index";
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      messageList: [],
      inputText: "",
    }
  }
  init = () => {
    msgPro.getMessageList().then((list) => {
      this.setState({
        messageList: list,
      })
    })
  }
  componentDidMount() {
    this.init();
    const socket = io(config.host);
    socket.on('connect', function(){});
    socket.on('event', function(data){});
    socket.on('disconnect', function(){
      alert("服务断开连接， 请刷新页面");
    });
    const that = this;
    socket.on('message', function(data){
      that.init();
    });
  }
  handlerInput = (e) => {
    this.setState({
      inputText: e.target.value
    })
  }
  postMessage = () => {
    msgPro.sendMessage(this.state.inputText);
    this.setState({
      inputText: ""
    })
  }
  clearMessage = () => {
    msgPro.clearMessage();
  }
  render() {
    return (
      <div className="App">
        <div className="App-content">
          <div className="chat">
            <div className="chat-message">
              <div className="message-content">
                <ul className="message-table">
                {this.state.messageList.map((message, index) => {
                  return (
                    <li key={index}  className="message-line">
                      {message.text}
                      <div className="message-time">
                      <span >{moment(message.creationDate).format("M-DD h:mm")}</span>
                      </div>
                    </li>
                  )
                })}
                </ul>
               
              </div>
              <div className="message-footer">
                <input className="message-input" value={this.state.inputText} onChange={this.handlerInput}></input>
                <button className="message-input-btn" onClick={this.postMessage}>发送</button>
              </div>
            </div>
            <div className="chat-file">
              <div className="file-list">
                文件列表
              </div>
              <div className="clear">
              <button className="message-input-btn-clear" onClick={this.clearMessage} >清除消息</button>
              <button className="message-input-btn-clear" >清除文件</button>
              </div>
            </div>
          </div>
        </div>
   
      </div>
    );
  }
}

export default App;
