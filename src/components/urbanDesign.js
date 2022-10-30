import React from "react";
import { createUseStyles } from "react-jss";
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchCentrality, fetchWalkability } from "./osm";
import ComboBox from "./dropdownCity";
import Button from '@mui/material/Button';
const useStyles = createUseStyles({
  toplane: {
    marginTop: "1vh",
    position: "relative",
    width: "100vw",
    height: "15vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    margin: "auto",
    position: "relative",
    width: "60vw",
    height: "50vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "auto"
  },
});

export function UrbanDesign() {
  const [citycor, setcitycor] = useState([]);
  const [cityName, setcityName] = useState([]);
  const [population, setPop] = useState(null);
  const [loading, setloading] = useState([false, false]);
  const [stat, setStat] = useState(["", "", ""]);
  const [image, setimage] = useState("");
  const [analysis,setAnalysis] = useState("");
  const classes = useStyles();;

  useEffect(() => {
    console.log("rerendering due to chnage of loading")

  }, [setloading, loading]);

  useEffect(() => {
    if (citycor.length > 0 && image.length == 0) {
      if(analysis == "centrality")
        fetchCentrality(citycor[1], citycor[0], setimage, setStat, setloading, 0)
      else if(analysis == "walkability")
        fetchWalkability(citycor[1], citycor[0], setimage, setloading, 1)
    }
    else {
      setloading([false, false])
      setimage("")
      setStat(["", "", ""])
    }
  }, [citycor]);

  function switchAnalysis(){
    switch(analysis){
      case "centrality":
        return CentralitityElemet
      case "walkability":
        return WalkabilityElement
      default:
        return <div>Please Choose an Analysis</div>
    }
  }

  const CentralitityElemet = (image.length > 1000 ?
    <div>
      <div>
        <div>
          <b>Average walking tolerance: {Number(stat[0]).toFixed(3)}m</b>
        </div>
        <div>
          <b>Spatial impedance factor: {Number(stat[1]).toFixed(3)}</b>
        </div>
        <b>Max walking tolerance: {Number(stat[2]).toFixed(2)}m</b>
      </div>
      <img className={classes.image} id="ItemPreview" src={image} />
    </div> :
    (loading[0] == true ? <div> It will take about 5 minutes to load the image <CircularProgress /> </div> : <div>Please Choose a City</div>))

    const WalkabilityElement = ((image.length > 1000 ?
      <div>
        <div>
          <div>
            <b>Max Walking Time: 15min</b>
          </div>
            <b>Walking Speed: 4.5km/h</b>
        </div>
        <img className={classes.image} id="ItemPreview" src={image} />
      </div> :
      (loading[1] == true ? <div> It will take about 5 minutes to load the image <CircularProgress /> </div> : <div>Please Choose a City</div>)))
  
    return (
    <div>
      <div className={classes.toplane}>
        <ComboBox setCity={setcitycor} setcityName={setcityName} oldcity={cityName} setpop={setPop} />
      </div>
      <Button variant="text" onClick={function(){
        setAnalysis("centrality")
      }}>Network Centrality Analysis</Button>
      
      <div>
      <Button variant="text" onClick={function(){
        setAnalysis("walkability")
      }}>Network Walkability Analysis</Button>
      </div>
      <div>
        {
         switchAnalysis()
        }
        
      </div>
    </div>
  );
}
