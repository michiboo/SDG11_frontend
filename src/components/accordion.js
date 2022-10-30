import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { createUseStyles } from "react-jss";
import { fetchAmenityV2, fetchTimeseries } from './osm';
import { graphtitle, labels, queries } from "./indicators/query"
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { BarChart } from "./indicators/barcharts";
import { XyChart } from "./indicators/xychart"
const useStyles = createUseStyles({
    header: {
        backgroundColor: "orange",
        //   clear: "both",
        alignItems: "left",
        justifyContent: "left"
    },
    barchart: {
        marginTop: "10vh",
        position: "relative",
        width: "25vw",
        height: "auto",
        display: "flex",
        marginLeft: "5vw",
        marginRight: "5vw"
    },
    loadingcircle: {
        marginTop: "10vh",
        position: "relative",
        width: "25vw",
        height: "auto",
        display: "flex",
        marginLeft: "15vw",
        marginRight: "15vw"
    }

});

export default function SimpleAccordion(props) {
    const classes = useStyles();
    const startState = { "1": {}, "2": {}, "3": {}, "4": {}, "5": {}, "6": {}, "7": {}, "8": {} }
    const [goalState, setGoalState] = useState(
        startState
    );
    const [xyChartState, setxyChartState] = useState(
        { "1": {}, "2": {}, "3": {}, "4": {}, "5": {}, "6": {}, "7": {}, "8": {} }
    );
    const [xyloadingchart, setxyloadingchart] = useState([false, false, false, false, false, false, false, false]);
    const [loadingchart, setloadingchart] = useState([false, false, false, false, false, false, false, false]);
    var currentyear = Number(new Date().getFullYear())
	const dateRange = [(currentyear - 3).toString(),(currentyear - 2).toString(), (currentyear - 1).toString()]
    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
    useEffect(() => {
        console.log("reseting")
        setGoalState(startState)
        setxyChartState({ "1": {}, "2": {}, "3": {}, "4": {}, "5": {}, "6": {}, "7": {}, "8": {} })
    }, [props.reset]);
    useEffect(() => {
        // alert("goal state changed")
    }, [goalState]);
    useEffect(() => {
        console.log("renew chart")
    }, [loadingchart, xyloadingchart]);
    useEffect(() => {
    }, [setGoalState]);
    var accordionelements = []
    for (const [key, item] of Object.entries(props.goals)) {
        accordionelements.push(
            <Accordion id={key} onChange={(e, expanded) => {
                if (expanded) {
                    for (var i = 0; i < queries[key].length; i++) {
                        const query = queries[key][i]
                        const nestedLabel = labels[key][i]
                        if (goalState[key][labels[key][i]] == undefined) {
                            delay(1000).then(() =>
                            fetchAmenityV2(props.cityAreaId, query, setGoalState, nestedLabel, setloadingchart, key))
                            // fetchAmenityV3(props.cityName[0], queries[key][i], setGoalState, labels[key][i], setloadingchart, key)                            
                        }
                        if (xyChartState[key][labels[key][i]] == undefined) 
                            var notgetYear = dateRange
                        else
                             notgetYear = dateRange.filter(year => !Object.keys(xyChartState[key][labels[key][i]]).includes(year)); 
                        if (xyChartState[key][labels[key][i]] == undefined || notgetYear.length > 0) {
                            delay(1000).then(() =>
                                fetchTimeseries(props.cityAreaId, query, setxyChartState, nestedLabel, setxyloadingchart, key, notgetYear)
                            )
                        }


                    }
                }
            }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${key}a-content`}
                    id={`panel${key}a-header`}
                    className={classes.header}
                    style={{ textAlign: "left" }}
                >
                    <Typography><b>{item['goal']}</b></Typography>
                </AccordionSummary>
                <AccordionDetails style={{ textAlign: "left" }}>
                    {item['indicators'].map((i, val) => (
                        <Typography>
                            <b> Definition: </b>{i['definition']}
                            <br />
                            <b> How We Measure: </b>{i['explanation']}
                        </Typography>
                    ))}

                    <div style={{ display: "flex" }}>
                        {Object.keys(goalState[key]).length > 0 ? (
                            <div className={classes.barchart}>
                                <BarChart title={`${graphtitle[key][0]} ${props.cityName[0]}`} pdata={goalState[key]} pop={props.pop / 100000} cityname={props.cityName[0]} />
                            </div>
                        )
                            : (loadingchart[parseInt(key)] == false ? null : <CircularProgress className={classes.loadingcircle} />)}
                        {Object.keys(xyChartState[key]).length > 0 ? (
                            <div className={classes.barchart}>
                                <XyChart title={`${graphtitle[key][0]} ${props.cityName[0]} for the past five years`} pdata={xyChartState[key]} pop={props.pop / 100000} cityname={props.cityName[0]} />
                            </div>

                        )
                            : (xyloadingchart[parseInt(key)] == false ? null : <CircularProgress className={classes.loadingcircle} />)}


                    </div>
                </AccordionDetails>
                {/* <XyChart title={`${graphtitle[key][0]} ${props.cityName[0]} for the past five years`} pdata={{"tree": {"2023": 100, "2013": 10}, "shop": {"2023" :10, "2013": 5}}} pop={props.pop / 100000} cityname={props.cityName[0]} /> */}
            </Accordion>)
    }
    return (
        <div>
            {accordionelements}
        </div>
    );
}
