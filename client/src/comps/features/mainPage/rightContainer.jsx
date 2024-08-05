import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./css/right.module.css";

const Users = ({ canvasId }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (canvasId) {
      axios
        .get(`/currentUsers/${canvasId}`)
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  }, [canvasId]);

  const renderColumns = () => {
    const column1 = users.slice(0, 30);
    const column2 = users.slice(30, 60);

    return (
      <>
        <div className={styles.userColumn}>
          {column1.map((user) => (
            <p key={user._id}>{user.username}</p>
          ))}
        </div>
        <div className={styles.userColumn}>
          {column2.map((user) => (
            <p key={user._id}>{user.username}</p>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className={styles.container}>
      {users.length === 0 ? <p>No Users Yet</p> : renderColumns()}
    </div>
  );
};

export default Users;
