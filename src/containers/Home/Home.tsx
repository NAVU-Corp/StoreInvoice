import React from "react";
import { Nav } from "../../components";
import "./Home.scss";

export const Home = () => {
  return (
    <div className="home">
      <Nav />
      <h1>This is React inside Electron!</h1>

      <button
        onClick={() => {
          electronApi.notificationApi.sendNotification(
            "My custom notification!"
          );
        }}
      >
        Send notification
      </button>
    </div>
  );
};
