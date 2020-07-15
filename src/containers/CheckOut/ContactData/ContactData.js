import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/Index';

class ContactData extends Component {
    state = {
        orderForm: {

            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Enter your Name.."
                },
                value:"",
                validation: {
                    required: true
                },
                isvalid: false,
                touched : false

            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "your Street.."
                },
                value:"",
                validation: {
                    required: true
                },
                isvalid: false,
                touched : false

            }, 
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "your ZipCode.."
                },
                value:"",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 10,
                    isNumeric: true
                },
                isvalid: false,
                touched : false

            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Enter your Country Name.."
                },
                value:"",
                validation: {
                    required: true
                },
                isvalid: false,
                touched : false

            },
            Email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Enter your Email.."
                },
                value:"",
                validation: {
                    required: true,
                    isEmail: true
                },
                isvalid: false,
                touched : false

            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ],
                value:"fastest",
                validation: {
                    required: true
                },
                isvalid: true
            }
          
        }   
    },   
    formValidity: false
}


checkValidity(value, rules){
    let isvalid = true;

    if(!rules){
        return true;
    }

    if(rules.required){
        isvalid = value.trim() !== '' && isvalid;
    }

    if(rules.minLength){
        isvalid = value.length >= rules.minLength && isvalid;
    }

    if(rules.maxLength){
        isvalid = value.length <= rules.maxLength && isvalid;
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isvalid = pattern.test(value) && isvalid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isvalid = pattern.test(value) && isvalid
    }

    return isvalid;
}

orderHandler = (event) => {
    event.preventDefault();
    //alert('You continue!');
    const formData = {};
    for(let formElementIdentifier in this.state.orderForm){
        formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
        ingredients: this.props.ings,
        price: this.props.price,
        orderData: formData
    }

    this.props.onOrderBurger(order);
    
    
    //console.log(this.props.ings);   

}

InputChangedHandler = (event, identifierValue) => {
    //console.log(event.target.value);
    const updatedOrderForm = {
        ...this.state.orderForm
    };
    const updatedFormElement = {
        ...updatedOrderForm[identifierValue]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.isvalid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[identifierValue] = updatedFormElement;

    let formIsValid = true;
    for(let identifierValue in updatedOrderForm){
        formIsValid = updatedOrderForm[identifierValue].isvalid && formIsValid;
    };

    this.setState({orderForm: updatedOrderForm, formValidity: formIsValid});
}

    render () {

        const formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
                <form onSubmit = {this.orderHandler}>
                    <h4>Enter Your Details Accurately!</h4>
                    {formElementsArray.map(formElement => (
                        <Input elementType={formElement.config.elementType}
                               elementConfig={formElement.config.elementConfig}
                               value={formElement.config.value}
                               Changed={(event) => this.InputChangedHandler(event, formElement.id)}
                               invalid = {!formElement.config.isvalid}
                               touched = {formElement.config.touched}
                               shouldValidate = {formElement.config.validation}
                         />
                    ))}
                    <button disabled = {!this.state.formValidity}>ORDER NOW</button>
                </form>
        );
        if(this.props.loading){
            form = <Spinner />;
        }

        return(
            <div className={classes.ContactData}>
               {form}; 
            </div>
        );
    }

}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    };
};

const mapDispatchToProps = dispatch => {

    return{
        onOrderBurger : (orderData) => dispatch(actions.purchaseBurger(orderData))
    };
    
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));