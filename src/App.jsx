import {useEffect, useState} from 'react'
import './App.css'
import {Navbar} from "./components/Navbar.jsx";
import {Main} from "./components/Main.jsx";

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = array[i];
        array[i] = array[j]
        array[j] = tmp
    }
    return array
}

function getUniqueCard(array) {
    let cantWin = true;
    do {
        array = shuffleArray(array)
        for (let i = 0; i < 6; i++) {
            if (array[i].picked === false) {
                cantWin = false;
            }
        }

    } while (cantWin === true)
    return array;
}


function App() {
    const [anime, setAnime] = useState([])
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [selectedAnime, setSelectedAnime] = useState(new Set())

    useEffect(() => {
        fetch('https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=12')
            .then(response => response.json())
            .then(data => {
                data.data.forEach(animeTitle => {
                    animeTitle.picked = false;
                })
                setAnime(data.data)
            })
    }, []);

    function resetPicked() {
        setAnime(prevAnimeLest => {
            return prevAnimeLest.map(anileTitle => {
                anileTitle.picked = false;
                return anileTitle;
            })
        })
    }

    function handleClick(id) {
        if (selectedAnime.has(id)) {
            if (score > bestScore) {
                setBestScore(score);
            }
            resetPicked()
            setScore(0);
            setSelectedAnime(prevSelected => new Set());
        } else {
            setScore(prevScore => {
                let result = prevScore + 1
                if (result === 12) {
                    setBestScore(12)
                    setScore(0)
                    resetPicked()
                    setSelectedAnime(prevSelected => new Set());
                }
                return result
            });
            if (score === 11) return;
            setAnime(prevAnimeList => {
                const newArr = prevAnimeList.map((animeTitle) => {
                    return animeTitle.mal_id === id ? {...animeTitle, picked: true} : animeTitle;
                })
                return getUniqueCard(newArr)
            })
            setSelectedAnime(prevSelected => {
                return new Set([...prevSelected, id]);
            })

        }
    }

    return (
        <div className={'app'}>
            <Navbar score={score} bestScore={bestScore}/>
            <Main animeCards={anime} handleClick={handleClick}/>
        </div>
    )
}

export default App
