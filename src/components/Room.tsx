import React, { Component, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import { socket, SocketContext } from "../context/socket";

interface RoomData {
  roomName: string,
  numberOfPlayers: number
}

interface RoomState {
  role: string,
}


class Room extends React.Component<RoomData, RoomState> {

  constructor(props: any) {
    super(props);

    this.state = {
      role: ''
    }
  }

  componentDidMount() {
    const socket = io("http://localhost:3333", {
    withCredentials: true,
    });
    
    socket.on('start', () => { console.log('received message from game room') });

    socket.on('role', (args) => {
      const { role } = args;
      this.setState({ role: role })
    });

    socket.on("connect_error", (err: any) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  componentDidUpdate() { }

  render() {
    return (
      <div className="text-center items-center">
        <h1 className="font-bold m-12 font-sans">
          Welcome to the Room {this.props.roomName}
        </h1>
        <h6 className="font-bold font-sans">Number of players: {this.props.numberOfPlayers} </h6>
        {
          this.state.role === 'sandman' ?
            <h1> You are the Sandman</h1> :
            this.state.role === 'bad guy' ?
              <h1> You are the Bad Guy</h1> :
              <h1> You are the Good Guy</h1>
        }

      </div>
    )
  };
}
export default Room;