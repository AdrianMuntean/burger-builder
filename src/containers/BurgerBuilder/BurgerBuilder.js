import React, {
    Component
} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import { connect } from 'react-redux';
import {addIngredient, removeIngredient, initIngredients} from '../../store/actions/burgerBuilder';
import axios from '../../axios-orders';
import { purchaseInit } from '../../store/actions/order';

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchasable: false,
            purchasing: false,
        }
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(el => ingredients[el])
            .reduce((sum, el) => sum + el, 0);

        return sum > 0
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        

        let burger = (<Spinner />);
    
        if (this.props.ings != null) {
            burger = (<Aux>
                <Burger ingredients = {this.props.ings}/>
                <BuildControls ingredientAdded = {this.props.onIngredientAdded}
                ingredientRemoved = {this.props.onIngredientRemoved}
                disabled = {disabledInfo}
                price = {this.props.totalPrice}
                purchasable={this.updatePurchaseState(this.props.ings)}
                ordered={this.purchaseHandler}
                /> 
            </Aux>);

            orderSummary = <OrderSummary ingredients = {this.props.ings} purchaseCanceled={this.purchaseCancelHandler} purchaseContinue={this.purchaseContinueHandler} price={this.props.totalPrice}/>
        }

        return ( 
            <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>
                {burger}
            
            </Aux>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(removeIngredient(ingName)),
        onInitIngredients: () => dispatch(initIngredients()),
        onInitPurchase: () => dispatch(purchaseInit())
    }
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));