import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import classes from '../Auth/Auth.css';
import * as actions from '../../store/actions/Index';
import {connect} from 'react-redux';
import Button from '../../components/UI/Button/Button';

class Auth extends Component{
    
    state = {
        controls: {
           Email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
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
           Password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: "Password"
                },
                value:"",
                validation: {
                    required: true,
                    minLength: 6
                },
                isvalid: false,
                touched : false
            }
        },
        isSignUp: true
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

    InputChangedHandler = (event, controlName) => {
        const updateControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                isvalid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }        
        };
        this.setState({controls: updateControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.Email.value, this.state.controls.Password.value, this.state.isSignUp);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return{isSignUp: !prevState.isSignUp};
        });
    }
    
    render() {
        const formElementsArray = [];
        for (let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        };

        const form  = formElementsArray.map(formElement => (
            <Input 
                   key = {formElement.id}
                   elementType={formElement.config.elementType}
                   elementConfig={formElement.config.elementConfig}
                   value={formElement.config.value}
                   Changed={(event) => this.InputChangedHandler(event, formElement.id)}
                   invalid = {!formElement.config.isvalid}
                   touched = {formElement.config.touched}
                   shouldValidate = {formElement.config.validation}
             />
            
        ));

        return(
            <div className = {classes.Auth}>
                <form onSubmit = {this.submitHandler}>
                    {form}
                    <button >SUBMIT</button>
                </form>
        <Button 
            clicked={this.switchAuthModeHandler}
            btnType="Danger">SWITCH TO {this.state.isSignUp ? "SIGNIN" : "SIGNUP"}</Button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuth: (email, password, isSignUp) => dispatch(actions.Auth(email, password, isSignUp))
    };
};

export default connect(null, mapDispatchToProps)(Auth);