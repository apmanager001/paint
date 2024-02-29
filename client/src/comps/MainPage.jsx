import React from 'react'
import styles from './features/mainPage/css/mainPage.module.css'
import Canvas from './features/mainPage/canvas'
import RightContainer from './features/mainPage/rightContainer'

const MainPage = () => {


  return (
    <div className={styles.container}>
      <div className={styles.left}></div>
      
      <div className={styles.middle}>
        <Canvas />
      </div>
      
      <div className={styles.right}>
        <RightContainer />
        </div>
    </div>
  );
}

export default MainPage