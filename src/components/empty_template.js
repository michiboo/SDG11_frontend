import React from "react";
import { createUseStyles} from "react-jss";
import { useState, useEffect } from 'react';

const useStyles = createUseStyles({
    container: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
  });

export function Robotchat() {
    const [chatmsg, setchatmsg] = useState([]);
    const [displaymsg, setdisplaymsg] = useState([]);
    const classes = useStyles();
   
    useEffect(() => {
   
  }, []);
    return (
      <div className={classes.container}>
      </div>
    );
  }
  