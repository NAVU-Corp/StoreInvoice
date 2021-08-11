import React, { useEffect, useState } from "react";
import { Nav } from "../../components";
import "./Home.scss";
import { UserEvent } from "../../constants/event";

export const Home: React.FC = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    apiElectron.on(UserEvent.RESULT_GET_ALL_USER, (_, data) => {
      setRows(data);
    });
  }, []);

  return (
    <div className="home">
      <Nav />
      <h1>This is React inside Electron!</h1>

      <button
        onClick={() => {
          apiElectron.sendMessages(UserEvent.INSERT_ONE_USER, {
            firstName: "minhthao",
            lastName: "nguyen",
            email: "minthao5648",
            phone: "0987654321",
          });
        }}
      >
        INSERT USER
      </button>

      <button
        onClick={() => {
          apiElectron.sendMessages(UserEvent.GET_ALL_USERS);
        }}
      >
        GET ALL USER
      </button>
      {rows.map((row: any, i) => {
        return <p key={i}>{row.phone}</p>;
      })}
    </div>
  );
};
