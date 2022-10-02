import { useEffect, useState } from 'react';
import { Create } from './Create';
import Room from './Room';

export function Home() {

    const [rooms, setRooms] = useState([{ name: '', started: false, capacity: '' }]);
    const [room, setRoom] = useState({ name: '', numberOfPlayers: 0 });
    const [createRoom, setCreateRoom] = useState(false);
    const [joinRoom, setJoinRoom] = useState(false);


    function handleClick(event: any) {
        setCreateRoom(true);
    }

    function handleJoinRoom(event: any) {
        let room = event.currentTarget.id;

        fetch(`http://localhost:3333/rooms/${room}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setRoom(result);
                    setJoinRoom(true);
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    useEffect(() => {
        fetch("http://localhost:3333/rooms")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('Success');
                    console.log(result);
                    setRooms(result);
                },
                (error) => {
                    console.log(error);
                    setRooms([]);
                }
            )
    }, []);

    return (
        <div>
            {
                joinRoom ?
                    <Room username={'Random Name'} roomName={room.name} numberOfPlayers={room.numberOfPlayers} create={false} /> :

                    createRoom ? (
                        <Create />
                    )
                        :
                        <div className="text-center">
                            <h1 className="font-bold m-36 text-7xl font-sans">
                                When i dream...
                            </h1>
                            <div className='grid grid-cols-4 px-32'>
                                {
                                    rooms
                                        .sort((a, b) => Number(a.started) - Number(b.started))
                                        .map(room => (
                                            <button onClick={handleJoinRoom} id={room.name} key={room.name} disabled={room.started} className={`${room.started ? `bg-pink-500 hover:bg-pink-700` : ` bg-green-500 hover:bg-green-700`} text-white font-bold mr-3 mt-3 py-2 px-4 rounded`}>
                                                {room.name} - {room.capacity}
                                            </button>
                                        ))
                                }
                            </div>
                            <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-12 py-2 px-4 rounded">
                                Create Room
                            </button>
                        </div>
            }
        </div>
    );
}
