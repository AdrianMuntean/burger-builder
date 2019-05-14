import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 10
                },
                valid: false,
                touched: false
            },

            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },

            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'fastest', displayValue: 'Fastest'}, 
                                {value: 'cheapest', displayValue: 'Cheapest'}]
                },
                value: 'fastest'
            },
        },
        loading: false,
        formIsValid: false
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (!rules) {
            return isValid;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let formEl in this.state.orderForm) {
            formData[formEl] = this.state.orderForm[formEl].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        console.log("order", order);
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({ loading: false })
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false })
            });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        console.log(event.target.value, inputIdentifier);
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier] 
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let input in updatedOrderForm) {
            formIsValid = !!updatedOrderForm[input] && updatedOrderForm[input].valid && formIsValid;
        }
        console.log("valid ", formIsValid);
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    resetForm = (event) => {
        event.preventDefault();
        document.getElementById("contactForm").reset();
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (<form onSubmit={this.orderHandler} id={'contactForm'}>
            {formElementsArray.map(el => (
                <Input key={el.id} elementType={el.config.elementType} elementConfig={el.config.elementConfig} value={el.value} changed={(event) => this.inputChangedHandler(event, el.id)} invalid={!el.config.valid} shoudValidate={el.config.validation} touched={el.config.touched}/>
            ))}
            {this.state.formIsValid && <Button btnType="Success">ORDER</Button>}
            {!this.state.formIsValid && <Button btnType="Danger" clicked={this.resetForm}>RESET</Button>}
        </form>);
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;