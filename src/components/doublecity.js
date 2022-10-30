import React from "react";
import ComboBox from "./dropdownCity";
import { createUseStyles } from "react-jss";
import { fetchCityAreaCode } from "./osm";
import { useState, useEffect } from 'react';

export function Doublecity(){
    const [citycor1, setcitycor1] = useState([]);
    const [cityAreaId1, setcityid1] = useState(null);
    const [cityName1, setcityName1] = useState([]);
    const [population1, setPop1] = useState(null);

    const [citycor2, setcitycor2] = useState([]);
    const [cityAreaId2, setcityid2] = useState(null);
    const [cityName2, setcityName2] = useState([]);
    const [population2, setPop2] = useState(null);

    useEffect(() => {
        if (citycor1.length > 0) {
            console.log("fetching area 1 ID ")
            fetchCityAreaCode(cityName1[0], cityName1[1], setcityid1)
            console.log(`city area id 1 is ${cityAreaId1}`)
        }
    }, [citycor1]);

    useEffect(() => {
        if (citycor2.length > 0) {
            console.log("fetching area 2 ID ")
            fetchCityAreaCode(cityName2[0], cityName2[1], setcityid2)
            console.log(`city area id 2 is ${cityAreaId2}`)
        }
    }, [citycor2]);

    const useStyles =
    createUseStyles({
        container:{
        },
        comboBox:{
            marginLeft: "25vw",
        }
    });
const classes = useStyles();
    return (
    <div className={classes.container}>
        <div style={{display:"flex"}}>
        <div className={classes.comboBox}>
            <b>City One:</b>
        <ComboBox  setCity={setcitycor1} setcityName={setcityName1} oldcity={cityName1} setpop={setPop1} />
        </div>
        <div className={classes.comboBox}>
        <b>City Two:</b>
        <ComboBox setCity={setcitycor2} setcityName={setcityName2} oldcity={cityName2} setpop={setPop2} />
        </div>
        </div>
    </div>)
}