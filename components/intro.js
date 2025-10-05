"use client";

import * as React from 'react';
import Grid from '@mui/material/Grid';
import { MuiChipsInput } from "mui-chips-input";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

const theme = createTheme({
    components: {
        MuiChip: {
            styleOverrides: {
                root: {
                    backgroundColor: "white",
                    color: "black",
                    border: "1px solid white",
                },
            },
        },
    },
});

export default function Intro({ names, setNames, game, setGame, active, setActive }) {

    const handleGameChange = (event) => {
        setGame(event.target.value);
    };

    return (
        <Grid container sx={{ justifyContent: "center", alignItems: "center" }} spacing={2}>
            <Grid item size={12} container justifyContent="center" alignItems="center">
                <ThemeProvider theme={theme}>
                    <MuiChipsInput
                        value={names}
                        onChange={setNames}
                        placeholder="Type player names"
                        sx={{
                            width: 500,
                            "& .MuiInputBase-input": { color: "white" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "white" },
                                "&:hover fieldset": { borderColor: "white" },
                                "&.Mui-focused fieldset": { borderColor: "white" },
                            },
                            "& .MuiInputBase-root": {
                                width: "100%", // make the input take the full width of parent
                                flexWrap: "wrap", // allow chips to wrap
                                display: "flex",
                            },
                        }}
                    />
                </ThemeProvider>
            </Grid>
            <Grid item size={12} container justifyContent="center" alignItems="center">
                <Button type="submit" variant="contained" color="primary" onClick={() => setActive(!active)}>
                    Play Skull King
                </Button>
            </Grid>
            <br/>
            <Grid item size={12} container justifyContent="center" alignItems="center">
                <Typography variant="p">
                    geo to-do items to improve this
                </Typography>
            </Grid>
            <ul>
                <li>Make state persist between page refresh</li>
                <li>Add ability to select a game (right now, it is only Skull King)</li>
            </ul>
        </Grid>
    )
}