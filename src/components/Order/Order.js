import React from 'react';
import style from './Order.module.css';

const order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({name: ingredientName,
                         amount: props.ingredients[ingredientName]});
    }

    const ingredientOutput = ingredients.map(el => {
        return <span 
        style={{textTransform: 'capitalize', display: 'inline-block', margin: '0 8px', border: '1px solid #ccc', padding: '5px'}} 
        key={el.name}>{el.name} ({el.amount})</span>
    })
    return (
    <div className={style.Order}>
        <p>
            Ingredients: {ingredientOutput}
        </p>
        <p>Price: <strong>{props.price}</strong></p>
    </div>
    );
};

export default order;