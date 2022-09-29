import { useForm, Resolver } from 'react-hook-form';
import { useState } from 'react';
import Room from './Room';

type FormValues = {
    name: string;
    numbeOfPlayers: string;
};

const resolver: Resolver<FormValues> = async (values) => {
    return {
        values: values ? values: {},
        errors: !values
            ? {
                name: {
                    type: 'required',
                    message: 'This is required.',
                }, 
                numbeOfPlayers: {
                    type: 'required',
                    message: 'This is required.'
                }
            }
            : {},
    };
};

export function Create() {

    const [enterRoom, setEnterRoom] = useState(true);
    const [roomName, setRoomName] = useState('Luiz Felipe');
    const [numberOfPlayers, setNumberOfPlayers] = useState(2);

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });
    const onSubmit = handleSubmit((data) => {
        const roomName = data.name;
        const numbeOfPlayers = parseInt(data.numbeOfPlayers);

        if (roomName.trim() === '') {
            alert('Room name must be valid');
            return;
        }

        if (isNaN(numbeOfPlayers) || numbeOfPlayers <= 0) {
            alert('Insert a valid number of players')
            return;
        }

        setEnterRoom(true);
        setRoomName(roomName);
        setNumberOfPlayers(numbeOfPlayers);
    });

    return (
        <div>
            {
                enterRoom ? <Room roomName={roomName} numberOfPlayers={numberOfPlayers}/> :
                    <div>
                        <div className="text-center items-center">
                            <h1 className="font-bold m-36 text-7xl font-sans">
                                Create Room
                            </h1>

                            <div className="w-96 my-0 m-auto">
                                <form className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4" onSubmit={onSubmit}>
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
                                        <input {...register("numbeOfPlayers")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="players_number" type="text" placeholder="7" />
                                    </div>
                                    <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded" type="submit" value="Submit" />
                                </form>
                            </div>
                        </div>
                    </div>}
        </div>
    )
}
