import { useEffect, useState } from 'react';
import { Create } from './Create';
import { Join } from './Join';

export function Home() {
    const [rooms, setRooms] = useState([{ name: '', started: false, capacity: '' }]);
    const [room, setRoom] = useState({ name: '', numberOfPlayers: 0 });
    const [createRoom, setCreateRoom] = useState(false);
    const [joinRoom, setJoinRoom] = useState(false);

    function handleClick(event: any) {
        setCreateRoom(true);
    }

    function handleModal(event: any) {
        let roomName = event.currentTarget.id;
        setJoinRoom(true);
        setRoom({ name: roomName, numberOfPlayers: 0 });
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
                joinRoom ? <Join roomName={room.name}/> :
                createRoom ? (
                    <Create />
                )
                    :
                    <div className='h-screen flex justify-center'>
                        <div className="text-center">
                            <h1 className="font-bold text-7xl font-sans mt-36">
                                When i dream...
                            </h1>
                            
                            <div className='grid grid-cols-4 mt-24 px-32'>
                                {
                                    rooms
                                        .sort((a, b) => Number(a.started) - Number(b.started))
                                        .map(room => (
                                            <button onClick={handleModal} id={room.name} key={room.name} disabled={room.started} className={`${room.started ? `bg-pink-500 hover:bg-pink-700` : ` bg-green-500 hover:bg-green-700`} text-white font-bold mr-3 mt-3 py-2 px-4 rounded`}>
                                                {room.name} - {room.capacity}
                                            </button>
                                        ))
                                }
                            </div>

                            <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-12 py-2 px-4 rounded">
                                Create Room
                            </button>

                        </div>
                    </div>
            }
        </div>
    );
}
