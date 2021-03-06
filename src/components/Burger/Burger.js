import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(el => {
            return [...Array(props.ingredients[el])].map((_, i) => {
                return <BurgerIngredient key={el + i} type={el} />
            });
    })
    .reduce((arr, el) => arr.concat(el));

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;