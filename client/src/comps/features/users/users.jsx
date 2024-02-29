import React, { useEffect, useState } from "react";
import styles from "./css/users.module.css"

const Users = () => {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data.users);
      });
  }, []);

  return (
    <div className={styles.container}>
      {(typeof backendData.users === "undefined") ? (
        <p> Loading...</p>
      ) : (
        backendData.users.map((user, i) => <p key={i}>{user}</p>)
      )}
    </div>
  );
};

export default Users;
