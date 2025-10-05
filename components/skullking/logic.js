import { ListItemText, TableCell, TableRow } from "@mui/material";

export function createGameDataObject(names) {
    const gameData = new Map();
    names.map(name => {
        gameData.set(name, [{ predicted: "?", actual: "?", roundPoints: 0 }]);
    })
    return gameData;
}

export function addNewRound(setGameData, setRounds) {
    setGameData(prev => {
        // clone the Map
        const newGameData = new Map(prev);
        // update each entry without mutating
        newGameData.forEach((value, key) => {
            // clone the array to avoid mutating previous state
            const updatedArray = [...value, { predicted: "?", actual: "?", roundPoints: 0 }];
            newGameData.set(key, updatedArray);
        });
        return newGameData;
    });
    setRounds(prevCount => prevCount + 1);
}

function calculateRoundScore(formData, index) {
    // if player has no data yet
    if (formData.actual == "?") {
        return 0
    }
    // player has finished round
    else {
        var correctBet = false;
        var score = 0;
        const predicted = parseInt(formData.predicted, 10)
        const actual = parseInt(formData.actual, 10)
        if (predicted != 0) {
            // player won the correct bids
            if (predicted == actual) {
                score += (formData.actual * 20)
                correctBet = true
            } else {
                score += (10 * -Math.abs(predicted - actual))
            }
        }
        // player bid zero
        else {
            if (actual == 0) {
                score += (10 * (index + 1))
                correctBet = true;
            } else {
                score +=  (-(10 * (index + 1)))
            }
        }
        // if player bet correct, add bonus points
        if (correctBet) {
            score += (parseInt(formData["standard14"], 10) * 10)
            score += (parseInt(formData["trump14"], 10) * 20)
            score += (parseInt(formData["mermaidcaptured"], 10) * 20)
            score += (parseInt(formData["piratescaptured"], 10) * 30)
            if (formData["skullkingcaptured"]) score += 40
        }
        return score
    }
}

export function updateEntry(setGameData, player, index, formData) {
    setGameData((prev) => {
        const newMap = new Map(prev); // copy Map

        const rounds = [...newMap.get(player)]; // copy array for immutability
        const round = { ...rounds[index] };     // copy object

        round.predicted = formData.predicted
        round.actual = formData.actual
        round.roundPoints = calculateRoundScore(formData, index)

        rounds[index] = round;

        newMap.set(player, rounds);

        return newMap;
    });
}

export function displayGameDataObject(gameData, index, name, handleOpen) {
    const playerRoundData = gameData.get(name)[index]
    const bets = `🔮 ${playerRoundData.predicted} ✅ ${playerRoundData.actual}`
    return (
        <ListItemText
            onClick={() => handleOpen(index, name)}
            primary={playerRoundData.roundPoints}
            secondary={bets}
        />
    )
}

function calculatePlayerTotalPoints(gameData, name) {
    const arr = gameData.get(name)
    var total = 0;
    arr.forEach((entry) => {
        total += entry.roundPoints;
    })
    return total
}

export function displayTotalPoints(gameData, names) {
    return (
        <TableRow>
            <TableCell>Total</TableCell>
            {names.map((name, index) => (
                <TableCell key={`${name}-${index}-total`}>
                    {calculatePlayerTotalPoints(gameData, name)}
                </TableCell>
            ))}
        </TableRow>
    )
}

export function newGame(setGameData, names, setRounds, setActive) {
    const gameData = new Map();
    names.map(name => {
        gameData.set(name, [{ predicted: "?", actual: "?", roundPoints: 0 }]);
    })
    setGameData(gameData);
    setRounds(0);
    setActive(false);
}