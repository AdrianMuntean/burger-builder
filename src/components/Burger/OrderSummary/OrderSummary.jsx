import React, {Component} from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(el => <li key={el}>
            <span style={{textTransform: 'capitalize'}}>{el}</span>: 
            {this.props.ingredients[el]}
            </li>);

return (
<Aux>
    <h3>Your order</h3>
    <p>A delicious burger with the following ingredients:</p>
    <ul>
        {ingredientSummary}
    </ul>
    <p>Total Price: <strong>{this.props.price.toFixed(2)}</strong></p>
    <p>Continue to checkout?</p>
    <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
    <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
</Aux>
);
    }
}

export default OrderSummary;