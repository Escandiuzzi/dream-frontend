import { useState } from "react";
import { useForm } from "react-hook-form";
import Room from "./Room";
var randomColor = require('randomcolor');
export function Join(props: any) {

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
    }
    );

    return (
        joinRoom ? <Room username={username} roomName={room.name} numberOfPlayers={room.numberOfPlayers} create={false} /> :
            <div className="text-center mt-24">
                <h1 className="font-sans font-bold text-3xl">Joining
                    <p style={{
                        color: randomColor({
                            luminosity: 'light'
                        })
                    }}>{props.roomName}</p>
                </h1>
                <div className="flex justify-center mt-10 ">
                    <div className="w-80 bg-white rounded text-center z-50">
                        <form className="shadow-md rounded p-8" onSubmit={onSubmit}>
                            <div className="mb-4 w-60 ">
                                <label className="block float-left text-gray-700 text-sm font-bold mb-2">
                                    Username
                                </label>
                                <input {...register('username')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="usename" type="text" placeholder="Jesse Pinkman" />
                            </div>
                            <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded" type="submit" value="Join" />
                        </form>
                    </div>
                </div>
            </div>
    );
}