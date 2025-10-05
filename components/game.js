"use client"

import * as React from 'react';
import Intro from "@/components/intro";
import { Navbar } from "@/components/navbar";
import { Button, Container, Grid, Typography } from "@mui/material";
import { createGameDataObject } from '@/components/skullking/logic';
import ScoreTable from '@/components/scoretable';


export default function Game() {
  const [names, setNames] = React.useState([]);
  const [game, setGame] = React.useState("")
  const [gameData, setGameData] = React.useState(new Map());
  const [rounds, setRounds] = React.useState(0);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    setGameData(createGameDataObject(names))
  }, [names]);

  return (
    <Container maxWidth="lg">
      <Navbar setGameData={setGameData} names={names} setRounds={setRounds} setActive={setActive} />
      {!active ?
        <>
          <Intro
            names={names}
            setNames={setNames}
            game={game}
            setGame={setGame}
            active={active}
            setActive={setActive}
          />
        </>
        :
        <>
          <ScoreTable names={names} gameData={gameData} setGameData={setGameData} rounds={rounds} setRounds={setRounds} />
        </>
      }
    </Container>
  );
}
