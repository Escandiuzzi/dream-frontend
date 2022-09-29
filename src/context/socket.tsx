import { io } from "socket.io-client";
import React from "react";

export const socket = io("http://localhost:3333", {
    withCredentials: true,
});
export const SocketContext = React.createContext(socket);