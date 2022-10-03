import { useState } from "react";
import { useForm } from "react-hook-form";
import Room from "./Room";

export function Modal(props: any) {

    const { register, handleSubmit } = useForm();
    
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState({ name: '', numberOfPlayers: 0 });
    const [joinRoom, setJoinRoom] = useState(false);

    const onSubmit = handleSubmit((data) => {
        const { username } = data;
        const { roomName } = props;

        setUsername(username);

        fetch(`http://localhost:3333/rooms/${roomName}`)
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

    });

    return (
        <div>
            {
                joinRoom ? <Room username={username} roomName={room.name} numberOfPlayers={room.numberOfPlayers} create={true}/> :
                <div className="w-64 h-44 bg-white rounded fixed top-2/4 left-2/4">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4" onSubmit={onSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Username
                            </label>
                            <input {...register('username')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="usename" type="text" placeholder="Jesse Pinkman" />
                        </div>
                        <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded" type="submit" value="Join" />
                    </form>
                </div>
            }
        </div>
    );

}