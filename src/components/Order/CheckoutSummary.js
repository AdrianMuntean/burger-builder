import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import styles from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>Bon appetit!</h1>
            <div style={{width: '100%', height: '300px', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.onCheckoutCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.onCheckoutContinued}>CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary;