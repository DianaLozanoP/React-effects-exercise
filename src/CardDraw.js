import { useState, useEffect } from "react"
import axios from "axios";
import Card from "./Card"

const CardDraw = () => {
    const [deckId, setDeckId] = useState(null);
    const [cardSrc, setSrc] = useState([])
    const [remaining, setRemaining] = useState(52)
    useEffect(() => {
        async function getDeckId() {
            const getId = await axios.get('https://deckofcardsapi.com/api/deck/new/')
            setDeckId(getId.data.deck_id)
        }
        getDeckId();
    }, [])
    async function getCard() {
        const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        setSrc([...cardSrc, res.data.cards[0].image])
        setRemaining(res.data.remaining)
    }
    const Cards = cardSrc.map(card => (
        <Card src={card} />
    ))
    async function shuffleDeck() {
        const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
        setSrc([])
        setRemaining(52)
    }
    return (
        <div>
            {remaining > 0 ?
                <button onClick={getCard}>Give me a card</button> :
                <h3>Error: no cards remaining!</h3>
            }
            <button onClick={shuffleDeck}>Shuffle the deck</button>
            {deckId ?
                Cards :
                <h3> Loading... </h3>}

        </div>
    )
}

export default CardDraw;