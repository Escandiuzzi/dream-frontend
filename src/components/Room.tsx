import React from 'react';
import { io } from 'socket.io-client';

var randomColor = require('randomcolor'); 

interface RoomData {
  username: string,
  roomName: string,
  numberOfPlayers: number,
  create: boolean
}

interface RoomState {
  role: string,
  card: string
  players: Array<string>
}

class Room extends React.Component<RoomData, RoomState> {

  constructor(props: any) {
    super(props);

    if (this.props.create) {
      this.socket.emit('create', { username: this.props.username, name: this.props.roomName, numberOfPlayers: this.props.numberOfPlayers })
    } else {
      this.socket.emit('join', { username: this.props.username, name: this.props.roomName })
    }

    this.state = {
      role: '',
      card: '',
      players: [''],
    }

    this.handleSkip = this.handleSkip.bind(this);
    this.handleGuess = this.handleGuess.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
  }

  socket = io("http://localhost:3333", {
    withCredentials: true,
  });

  handleSkip() {
    this.socket.emit('skipped', { name: this.props.roomName, numberOfPlayers: this.props.numberOfPlayers });
  }

  handleGuess() {
    this.socket.emit('guessed', { name: this.props.roomName, numberOfPlayers: this.props.numberOfPlayers });
  }

  handleStartGame() {
    this.socket.emit('start', {});
  }

  private roleDescription = '';

  componentDidMount() {
    this.socket.on('start', () => { console.log('received message from game room') });
    this.socket.on('players_changed', (args) => {

      console.log(args);

      const { players } = args;
      this.setState({ players: players });
    });

    this.socket.on('role', (args) => {
      const { role } = args;
      console.log(role);
      this.setState({ role: role });

      switch (role) {
        case 'sandman':
          this.roleDescription = 'You are the Sandman';
          break;
        case 'bad guy':
          this.roleDescription = 'You are the Bad Guy';
          break;
        case 'good guy':
          this.roleDescription = 'You are the Good Guy';
          break;
        case 'guesser':
          this.roleDescription = 'You are dreaming...';
          break;
        default:
          break;
      }
    });

    this.socket.on('card', (args) => {
      const { card } = args;
      this.setState({ card: card });
    });

    this.socket.on("connect_error", (err: any) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  componentDidUpdate() { }

  render() {
    document.title = this.props.roomName;
    return (
      <div>
        <div className='overflow-auto'>
          <div className='text-center w-18 ml-12 mt-12 absolute left-0 '>
            <h4 className='font-bold mb-3'>Players</h4>
            {
              this.state.players.map(player =>
                <h6 style={{
                  color: randomColor({
                    luminosity: 'light'
                  })
                }} className="font-sans font-bold text-sm" key={player + this.state.players.indexOf(player)}>{player}</h6>)
            }
          </div>
          <div className="text-center relative">
            <h1 className="font-bold mt-12 font-sans text-3xl">
              Welcome to {this.props.roomName}
            </h1>
            <h6 className="font-sans text-neutral-400 text-xs mt-4">Number of players: {this.props.numberOfPlayers} </h6>
            <h4 className='font-bold font-sans mt-32 text-2xl'>{this.roleDescription}</h4>
            {
              this.state.role === 'guesser' ?
                <></> :
                this.state.role === '' ?
                  <div>
                    <h3 className='font-bold mt-8'>Waiting room!</h3>
                    <h3 className='font-sans mt-12'>What does a liar do when he's dead?</h3>
                    <button onClick={this.handleStartGame} className="bg-purple-500 hover:bg-purple-700 text-white font-bold w-32 my-32 mx-2 py-2 px-4 rounded">Start Game</button>
                  </div>
                  :
                  <div className='mt-32'>
                    <h1 className='font-bold font-sans'>{this.state.card}</h1>
                    <div className='my-o mt-auto items-center'>
                      <button onClick={this.handleSkip} className="bg-red-500 hover:bg-red-700 text-white font-bold w-28 my-24 mx-2 py-2 px-4 rounded">Skip</button>

                      <button onClick={this.handleGuess} className="bg-green-500 hover:bg-green-700 text-white font-bold w-28   my-24 mx-2 py-2 px-4 rounded">Guessed</button>
                    </div>
                  </div>
            }
          </div>
        </div>
      </div>
    )
  };
}

export default Room;