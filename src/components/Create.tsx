import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Room from './Room';

export function Create() {

    const [enterRoom, setEnterRoom] = useState(false);
    const [username, setUsername] = useState('');
    const [roomName, setRoomName] = useState('');
    const [numberOfPlayers, setNumberOfPlayers] = useState(7);

    const {register, handleSubmit} = useForm();
    
    const onSubmit = handleSubmit((data) => {
        const {username, name, numberOfPlayers} = data;

        const nPlayers = parseInt(numberOfPlayers);

        if (name.trim() === '') {
            alert('Room name must be valid');
            return;
        }

        if (isNaN(nPlayers) || nPlayers <= 0) {
            alert('Insert a valid number of players')
            return;
        }

        setEnterRoom(true);
        setUsername(username)
        setRoomName(name);
        setNumberOfPlayers(nPlayers);
    });

    return (
        <div>
            {
                enterRoom ? <Room username={username} roomName={roomName} numberOfPlayers={numberOfPlayers} create={true}/> :
                    <div>
                        <div className="text-center items-center">
                            <h1 className="font-bold mt-24 text-7xl font-sans">
                                Create Room
                            </h1>

                            <div className="w-96 my-0 m-auto">
                                <form className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4 mt-12" onSubmit={onSubmit}>
                                <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Username
                                        </label>
                                        <input {...register("username")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="room_name" type="text" placeholder="Jesse Pinkman" />
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Room Name
                                        </label>
                                        <input {...register("name")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="room_name" type="text" placeholder="Heisenberg's Room" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Number of Players
                                        </label>
                                        <input {...register("numberOfPlayers")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="players_number" type="text" placeholder="7" />
                                    </div>
                                    <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded" type="submit" value="Create" />
                                </form>
                            </div>
                        </div>
                    </div>}
        </div>
    )
}
