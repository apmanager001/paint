import React,{useEffect, useState} from 'react'
import styles from './features/mainPage/css/mainPage.module.css'
import Canvas from './features/mainPage/canvas'
import axios from 'axios'
import RightContainer from './features/mainPage/rightContainer'

const MainPage = () => {
  const [canvasId, setCanvasId] = useState(null)
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get("/getCanvas")
      .then((response) => {
        setCanvasId(response.data.canvasId);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setErrorMessage("There are not a Canvas yet");
        } else {
          console.error("Error fetching canvas:", error);
          setErrorMessage("An error occurred while fetching data");
        }
      });
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.left}></div>

      <div className={styles.middle}>
        <Canvas originalCanvasId={canvasId}/>
      </div>

      <div className={styles.right}>
        <RightContainer canvasId={canvasId}/>
      </div>
    </div>
  );
}

export default MainPage