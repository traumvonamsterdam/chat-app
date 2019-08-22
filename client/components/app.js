import io from "socket.io";
import Chatroom from './Chatroom'

const App = () => {
  const socket = io.connect("http://localhost:4000");

  return (
    <Chatroom socket={socket} />
  )
};

export default App;





