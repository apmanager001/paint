import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./css/right.module.css";

const Users = () => {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    axios("/currentUsers")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data.users);
      });
  }, []);

  return (
    <div className={styles.container}>
      {typeof backendData.users === "undefined" ? (
        <p> Loading...</p>
      ) : (
        backendData.users.map((user, i) => <p key={i}>{user}</p>)
      )}
    </div>
  );
};

export default Users;
