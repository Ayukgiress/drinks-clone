

import React, { useState, useEffect } from "react";
import "./Style.css";

const DrinkLists = () => {
    const [drinks, setDrinks] = useState([]);
    const [currentDrinkIndex, setCurrentDrinkIndex] = useState(0);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const fetchDrinks = async () => {
            try {
                const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                setDrinks(data.drinks); // Update the state with fetched data
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

        return () => clearInterval(interval);
    }, [drinks]);

    const handlePrevClick = () => {
        setCurrentDrinkIndex((prevIndex) => (prevIndex - 1 + drinks.length) % drinks.length);
    };

    const handleNextClick = () => {
        setCurrentDrinkIndex((prevIndex) => (prevIndex + 1) % drinks.length);
    };

    const handleDetails = () => {
        setShowDetails(!showDetails);
    };
      

    return (
        <div className="drink-list">
            <div className="caption">
                
                <div className="image-container">
                    <img src="https://images.pexels.com/photos/5946648/pexels-photo-5946648.jpeg?auto=compress&cs=tinysrgb&w=400" alt="img" className="img-cont"/>
                    <img src="https://images.pexels.com/photos/5947015/pexels-photo-5947015.jpeg?auto=compress&cs=tinysrgb&w=400" alt="img" className="img-cont"/>
                    <img src="https://images.pexels.com/photos/9805420/pexels-photo-9805420.jpeg?auto=compress&cs=tinysrgb&w=400" alt="img" className="img-cont"/>
                    <img src="https://images.pexels.com/photos/8455811/pexels-photo-8455811.jpeg?auto=compress&cs=tinysrgb&w=400" alt="img" className="img-cont"/>
                    <img src="https://images.pexels.com/photos/2531184/pexels-photo-2531184.jpeg?auto=compress&cs=tinysrgb&w=400" alt="img" className="img-cont"/>
                    <img src="https://images.pexels.com/photos/2795026/pexels-photo-2795026.jpeg?auto=compress&cs=tinysrgb&w=400" alt="img" className="img-cont"/>
                </div>
                <h2>cheers for finding your  desired  <br />bevarage  amongst a thousand</h2>
            </div>
            {drinks.map((drink, index) => (
    <div key={drink.idDrink} className={`drink-item ${index === currentDrinkIndex ? 'active' : ''}`}>
        <h3 className="h3">{drink.strDrink}</h3>
        <img src={drink.strDrinkThumb} alt={drink.strDrink} className="img"/>

        {showDetails && (
    <div className="details">
        <p>Details: {drink.strInstructions}</p>
    </div>
)}

        <div className='btns'>
            <button className='prev' onClick={handlePrevClick}>Prev</button>
            <button className="det" onClick={handleDetails}> Details</button>
            <button className='next' onClick={handleNextClick}>Next</button>
        </div>
    </div>
))}
            
        </div>
    );
};

export default DrinkLists;