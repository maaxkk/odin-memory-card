
import '../styles/Card.css'

function Card({name, src, handleClick, picked}) {
    return (
        <button onClick={handleClick} className={picked ? 'card' : 'card card--picked'}>
            <img src={src} alt={`Image of ${name}`}/>
            <h2 className={'card--name'}>{name}</h2>
        </button>
    )
}

export {Card}