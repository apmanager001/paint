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
  return (
    <div className={styles.container}>
      {users.length === 0 ? (
        <p>No Users Yet</p>
      ) : (
        users.map((user, i) => (
        <p key={user._id}>{user.username}</p>
      ))
      )}
    </div>
  );
};

export default Users;
