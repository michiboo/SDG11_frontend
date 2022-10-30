import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { createUseStyles } from "react-jss";
import { SingleCity } from "./singlecity"
import { Doublecity } from "./doublecity"
import { UrbanDesign } from './urbanDesign';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CompareIcon from '@mui/icons-material/Compare';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import { makeCardLink } from './Cardlink';

export function Main() {
    const useStyles =
        createUseStyles({
            main: {
                backgroundColor: 'blue',
            }
        });
    const classes = useStyles();
    
    useEffect(() => {
    }, []); // <-- empty array means 'run once'

    const Maintext = <div>
        <h3> Welcome to the Simple SDG 11 progress tracker for cities </h3>
        <p>This website provide an estimation of SDG11 progress by utilize OpenStreetMap data</p>
        <p>If you like to found out more about SDG 11 please click <a href="https://sdgs.un.org/goals/goal11">here</a></p>
    </div>

    function handleButtonClick(i, func) {
        document.getElementById("input-text").value = ""
    }
    var paddingLeft = { paddingLeft: '10px' };

    return (
        <BrowserRouter>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                    <img src={require('./resource/banner_sdg_11.png')} style={{
                       width: "auto",
                       height: "30vh",
                       alignItems: "center",
                       marginRight: "auto",
                       marginLeft: "auto",
                        }} />
                    </Grid>
                    <Grid item xs={12} style={{display: "flex", height:"fit-content"}}>
                    <img src={require('./resource/sdg11Bannerleft.png')}
                        style={{
                            width: "auto",
                            height: "30vh",
                            alignItems: "left",
                            margin: "auto",
                            
                        }}
                    />
                    <div style={{"width": "120vh"}}>
                    <h1>Just a Simple SDG 11 Progress Tracker for cities</h1>
                        <div style={{display:"flex", marginLeft: "20%", marginRight: "20%"}}>
                        {makeCardLink(<Link to="/singleCity"><b>Check Your City's SDG 11 score </b></Link>, <LocationCityIcon sx={{ fontSize: 100 }} />)}
                        {makeCardLink(<Link to="/comparecities"> Compare Cities Around The World  </Link>, <CompareIcon sx={{ fontSize: 100 }} />)}
                        {makeCardLink(<Link to="/urbanDesignAnalysis"> Urban Design Analysis </Link>, <AnalyticsIcon sx={{ fontSize: 100 }} />)}
                        {makeCardLink(<Link to="/generatebanner"> Generate SDG 11 Banner for your city </Link>,<WallpaperIcon sx={{ fontSize: 100 }} />)}
                        </div>
                        </div>
                        <img src={require('./resource/sdg11BannerRight.png')} style={{
                       width: "auto",
                       height: "30vh",
                       alignItems: "right",
                       margin: "auto",
                        }} />
                    </Grid>
                    <Grid item xs={12} style={{paddingTop:"0px"}}>
                        <Routes>
                            <Route exact path="/" element={Maintext} />
                            <Route path="/singleCity" element={<SingleCity />} />
                            <Route path="/comparecities" element={<Doublecity/>} />
                            <Route path="/urbanDesignAnalysis" element={<UrbanDesign />} />
                            <Route path="/generateBanner" element={<div />} />
                        </Routes>
                    </Grid>
                </Grid>
            </Box>
        </BrowserRouter>
    );
}