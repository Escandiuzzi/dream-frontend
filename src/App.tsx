import './App.css';
//import { io } from "socket.io-client";

// const socket = io("http://localhost:3333", {
//   withCredentials: true,
// });

// socket.on('connection', () => {
//   console.log('connectd');
// });

// socket.on('start', () => { console.log('received message from game room') });
// socket.on('role', (...args) => { console.log(args); socket.emit('guessed', '') });
// socket.on("connect_error", (err: any) => {
//   console.log(`connect_error due to ${err.message}`);
// });

function App() {
  return (
    <div className="App">
      <h1 className="font-bold m-36 text-7xl font-sans">
        When i dream...
      </h1>

      <div className='grid grid-cols-4 px-32'>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mr-3 mt-3 py-2 px-4 rounded">
          Join Room 1
        </button>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mr-3 mt-3 py-2 px-4 rounded">
          Join Room 2
        </button>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mr-3 mt-3 py-2 px-4 rounded">
          Join Luiz Felipe`s Room
        </button>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mr-3 mt-3 py-2 px-4 rounded">
          Join Dreaming
        </button>
        
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mr-3 mt-3 py-2 px-4 rounded">
          Join Brazil
        </button>
        
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mr-3 mt-3 py-2 px-4 rounded">
          Join NodeJS
        </button>
        
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mr-3 mt-3 py-2 px-4 rounded">
          Join Typescript
        </button>
        
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mr-3 mt-3 py-2 px-4 rounded">
          Join Another Room
        </button>
        
      </div>


      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-12 py-2 px-4 rounded">
        Create Room
      </button>
    </div>
  );
}

export default App;
