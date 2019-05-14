import React, {
    Component
} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: null,
            totalPrice: 4,
            purchasable: false,
            purchasing: false,
            loading: false
        }
    }

    componentDidMount() {
        axios.get('https://burger-builder-be915.firebaseio.com/ingredients.json')
        .then(response => {
            console.log(response);
            this.setState({ingredients: response.data});
        });
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(el => ingredients[el])
            .reduce((sum, el) => sum + el, 0);

        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;

        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;

        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });

        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams.join('&')
        });

    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        

        let burger = (<Spinner />);
    
        console.log(this.state);
        if (this.state.ingredients != null) {
            burger = (<Aux>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls ingredientAdded = {this.addIngredientHandler}
                ingredientRemoved = {this.removeIngredientHandler}
                disabled = {disabledInfo}
                price = {this.state.totalPrice}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}
                /> 
            </Aux>);

            orderSummary = <OrderSummary ingredients = {this.state.ingredients} purchaseCanceled={this.purchaseCancelHandler} purchaseContinue={this.purchaseContinueHandler} price={this.state.totalPrice}/>
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
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

export default withErrorHandler(BurgerBuilder, axios);