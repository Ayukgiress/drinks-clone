

import React, { useState, useEffect } from "react";
import CardBoard from "./CardBoard"
import "./Style.css";

const DrinkLists = () => {
    const [drinks, setDrinks] = useState([]);
    const [currentDrinkIndex, setCurrentDrinkIndex] = useState(0);
    const [showDetails, setShowDetails] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        const fetchDrinks = async () => {
            try {
                const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                setDrinks(data.drinks);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDrinks();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDrinkIndex((prevIndex) => (prevIndex + 1) % drinks.length);
        }, 5000); 

        setIntervalId(interval);

        return () => clearInterval(interval);
    }, [drinks]);

    const handlePrevClick = () => {
        setCurrentDrinkIndex((prevIndex) => (prevIndex - 1 + drinks.length) % drinks.length);
        if (!intervalId) {
            const interval = setInterval(() => {
                setCurrentDrinkIndex((prevIndex) => (prevIndex + 1) % drinks.length);
            }, 5000); 
    
            setIntervalId(interval);
        }
    };

    const handleNextClick = () => {
        setCurrentDrinkIndex((prevIndex) => (prevIndex + 1) % drinks.length);
    };
   

    // const handleNextClick = () => {
    //     setCurrentDrinkIndex((prevIndex) => (prevIndex + 1) % drinks.length);
    // };

    const handleDetails = () => {
        setShowDetails(!showDetails);
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };
      

    return (
        <div className="drink-list">
            <CardBoard />
            
            {drinks.map((drink, index) => (
        <div key={drink.idDrink} className={`drink-item ${index === currentDrinkIndex ? 'active' : ''}`}>
        <div className='carousel'>
        <img src={drink.strDrinkThumb} alt={drink.strDrink} className="img"/>
        </div>

          <h3 className="h3">{drink.strDrink}</h3>

          <h4>{drink.strIngredient}</h4>
        {showDetails && (
    <div className="details">
        <p className='overlay'>Details: {drink.strInstructions}</p>
    </div>
)}



       
    </div>

    
))}

<div className='btns'>
        <button className='prev' onClick={handlePrevClick}> &larr; </button>
            <button className="det" onClick={handleDetails}> Details</button>
            <button className='next' onClick={handleNextClick}> &rarr; </button>
        </div>

        </div>
    );
};

export default DrinkLists;