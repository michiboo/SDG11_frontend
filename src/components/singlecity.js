import React from "react";
import { createUseStyles } from "react-jss";
import { useState, useEffect } from 'react';
import { fetchCityAreaCode } from "./osm";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import "../../node_modules/leaflet/dist/leaflet.css";
import ComboBox from "./dropdownCity";
import {goals} from "./indicators/goal"
import SimpleAccordion from "./accordion"

const useStyles = createUseStyles({
    container: {
        width: "100vw",
        height: "auto",
        display: "flex",
        alignItems: "top",
        justifyContent: "center",
        position: "relative",
        marginBottom: "auto"
    },
    toplane: {
        marginTop: "1vh",
        position: "relative",
        width: "100vw",
        height: "15vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    barchart: {
        marginTop: "10vh",
        position: "relative",
        width: "auto",
        height: "auto",
        display: "flex",
        marginLeft: "5vw",
        marginRight: "5vw"
    }
});

export function SingleCity(props) {
    const noOfGoals = ["1","2","3","4","5","6","7","8"];
    const [citycor, setcitycor] = useState([]);
    const [cityAreaId, setcityid] = useState(null);
    const [cityName, setcityName] = useState([]);
    const [population, setPop] = useState(null);
    const classes = useStyles();

    useEffect(() => {

    }, [setcitycor]);
    useEffect(() => {
        if (citycor.length > 0) {
            console.log("fetching area ID")
            fetchCityAreaCode(cityName[0], cityName[1], setcityid)
            console.log(`city area id is ${cityAreaId}`)
        }
    }, [citycor]);
    useEffect(() => {
        console.log(`city area id changed to ${cityAreaId}`)
    }, [cityAreaId]);
    
    return (
        <div>
            {/* {alert(goalState)} */}
            <div className={classes.toplane}>
                <ComboBox setCity={setcitycor} setcityName={setcityName} oldcity={cityName} setpop={setPop} />

            </div>
            {citycor.length > 0 ? <div>Population: {population} </div> : null}
            <div className={classes.container}>
                {citycor.length > 0 ?
                    <MapContainer style={{ height: "450px", width: "50%", top:"0" }} center={citycor} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </MapContainer>

                    : null}
                {citycor.length > 0? (<SimpleAccordion style={{position:"relative", alignItems:"top", top:"0"}} goals={goals} cityAreaId={cityAreaId} reset={citycor} cityName={cityName} pop={population} />) : null}
                {/* {citycor.length > 0 ? (loadingchart == false ? <div><ScoreChart classes={classes.barchart} /></div>: <div></div> ): null} */}
            </div>
        </div>

    );
}
