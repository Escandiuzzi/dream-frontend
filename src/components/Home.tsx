import { useEffect, useState } from 'react';
import { Create } from './Create';

export function Home() {

    const [rooms, setRooms] = useState([]);
    const [createRoom, setCreateRoom] = useState(false);


    function handleClick(event: any) {
        setCreateRoom(true);
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
                }
            )
    }, []);

    return (
        <div>
            {
                createRoom ? (
                    <Create />
                )
                    :
                    <div className="text-center">
                        <h1 className="font-bold m-36 text-7xl font-sans">
                            When i dream...
                        </h1>
                        <div className='grid grid-cols-4 px-32'>
                            {rooms.map(room => (
                                <button key={room} className="bg-pink-500 hover:bg-pink-700 text-white font-bold mr-3 mt-3 py-2 px-4 rounded">
                                    {room}
                                </button>
                            ))}
                        </div>
                        <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-12 py-2 px-4 rounded">
                            Create Room
                        </button>
                    </div>
            }
        </div>
    );
}
