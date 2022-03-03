import "./styles/styles.css";
import "./styles/tailwind.css";
import {
  useHMSActions,
  useHMSStore,
  selectIsConnectedToRoom
} from "@100mslive/hms-video-react";
import Preview from "./components/Preview";
import Room from "./components/Room";

const endPoint =
  "https://prod-in.100ms.live/hmsapi/workshop9jul.app.100ms.live/";

const getToken = async (user_id) => {
  const response = await fetch(`${endPoint}api/token`, {
    method: "POST",
    body: JSON.stringify({
      user_id,
      role: "host", //host, teacher, guest, student
      type: "app",
      room_id: "62099c006f2b876d58ef3629"
    }) 
  });
  const { token } = await response.json();
  return token;
};

const App = () => {
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const handleSubmit = async (userName) => {
    const token = await getToken(userName);
    hmsActions.join({ authToken: token, userName });
  };

  return (
    <>{isConnected ? <Room /> : <Preview handleSubmit={handleSubmit} />}</>
  );
};

export default App;
