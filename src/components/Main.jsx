import '../styles/Main.css'
import {Card} from "./Card.jsx";


function Main(props) {
    const cards = props.animeCards.slice(0, 6).map(card => {
        return <Card
            key={card.mal_id}
            src={card.images.jpg.image_url}
            name={card.title_english}
            picked={card.picked}
            handleClick={() => props.handleClick(card.mal_id)}
        />
    })
    return (
        <div className={'main'}>
            {cards}
        </div>
    )
}

export {Main}