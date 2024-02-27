import { useState, useEffect } from "react"
import axios from "axios";

const Card = ({ src }) => {
    console.log(src)
    return (
        <div>
            <img src={src}></img>
        </div >
    )
}

export default Card;