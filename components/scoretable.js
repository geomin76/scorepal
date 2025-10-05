import React, { useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, TextField,
    Modal,
    Box,
    Typography,
    createTheme,
    ThemeProvider,
    Button,
    Stack,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import { addNewRound, displayGameDataObject, displayTotalPoints, updateEntry } from "./skullking/logic";
import MuiNumberInput from "./numinput";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    p: 2,
    display: "flex",
    flexDirection: "column",
    width: "80%",
    // height: "40vh",
    justifyContent: "center",
    alignItems: "center",
};

const theme = createTheme({
    palette: {
        mode: "dark", // enables dark mode defaults
        background: {
            default: "#000000", // page background
            paper: "#121212",   // surfaces (cards, dialogs, etc.)
        },
        text: {
            primary: "#ffffff", // main text color
            secondary: "#aaaaaa", // optional: dimmed text
        },
    },
});

export default function ScoreTable({ names, gameData, setGameData, rounds, setRounds }) {
    const [open, setOpen] = React.useState(false);
    const [indexChoice, setIndexChoice] = React.useState({ index: "", name: "" });
    const [standard14, setStandard14] = useState(0);
    const [trump14, setTrump14] = useState(0);
    const [mermaidcaptured, setMermaidCaptured] = useState(0);
    const [piratescaptured, setPiratesCaptured] = useState(0);
    const [skullkingcaptured, setSkullKingCaptured] = useState(false);

    const handleOpen = (index, name) => {
        setIndexChoice({ index: index, name: name })
        const userData = gameData.get(name)[index]
        setFormData(userData);
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const [formData, setFormData] = useState({
        predicted: "?",
        actual: "?",
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        // only allow numeric values
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        formData["standard14"] = standard14
        formData["trump14"] = trump14
        formData["mermaidcaptured"] = mermaidcaptured
        formData["piratescaptured"] = piratescaptured
        formData["skullkingcaptured"] = skullkingcaptured
        updateEntry(setGameData, indexChoice.name, indexChoice.index, formData)
        setFormData({
            predicted: "?",
            actual: "?",
        })
        setStandard14(0)
        setTrump14(0)
        setMermaidCaptured(0)
        setPiratesCaptured(0)
        setSkullKingCaptured(false)
        handleClose();
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <TableContainer component={Paper} sx={{ backgroundColor: 'black', color: "white", height: "100vh" }}>
                    <Table sx={{ minWidth: 650, backgroundColor: 'black' }} size="medium" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                {names.map((name, index) => {
                                    return <TableCell key={index}>{name}</TableCell>
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                Array.from({ length: rounds + 1 }).map((_, i) => (
                                    <React.Fragment key={i}>
                                        <TableRow>
                                            <TableCell>Round {i + 1}</TableCell>
                                            {names.map((name, index) => (
                                                <TableCell key={`${name}-${index}`}>
                                                    {displayGameDataObject(gameData, i, name, handleOpen)}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </React.Fragment>
                                ))
                            }
                            {displayTotalPoints(gameData, names)}
                        </TableBody>
                    </Table>
                    <Box sx={{ position: "fixed", padding: "10px" }}>
                        <Button variant="outlined" sx={{ backgroundColor: "black", color: "white" }} onClick={() => addNewRound(setGameData, setRounds)}>New round</Button>
                    </Box>
                </TableContainer>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle} component="form" onSubmit={handleFormSubmit}>
                        <Stack spacing={2}>
                            <Typography>{indexChoice.name}'s round {indexChoice.index + 1} data</Typography>
                            <TextField
                                label="Predicted"
                                type="number"
                                name="predicted"
                                value={formData.predicted}
                                onChange={handleFormChange}
                            />
                            <TextField
                                label="Actual"
                                type="number"
                                name="actual"
                                value={formData.actual}
                                onChange={handleFormChange}
                            />
                            <MuiNumberInput
                                value={standard14}
                                onChange={(v) => setStandard14(v)}
                                min={0}
                                max={3}
                                step={1}
                                label="How many standard 14s captured?"
                                helperText=""
                                fullWidth
                            />
                            <MuiNumberInput
                                value={trump14}
                                onChange={(v) => setTrump14(v)}
                                min={0}
                                max={1}
                                step={1}
                                label="How many trump 14s captured?"
                                helperText=""
                                fullWidth
                            />
                            <MuiNumberInput
                                value={mermaidcaptured}
                                onChange={(v) => setMermaidCaptured(v)}
                                min={0}
                                max={2}
                                step={1}
                                label="How many mermaids captured?"
                                helperText=""
                                fullWidth
                            />
                            <MuiNumberInput
                                value={piratescaptured}
                                onChange={(v) => setPiratesCaptured(v)}
                                min={0}
                                max={5}
                                step={1}
                                label="How many pirates captured?"
                                helperText=""
                                fullWidth
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={skullkingcaptured} onChange={() => setSkullKingCaptured(!skullkingcaptured)} name="mermaid_captured_skullking" />
                                }
                                label="Skull King captured by mermaid?"
                            />
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Stack>
                    </Box>
                </Modal>
            </ThemeProvider>
        </>
    );
}
