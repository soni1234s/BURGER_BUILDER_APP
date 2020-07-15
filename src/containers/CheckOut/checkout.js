import React, {Component} from 'react';
import CheckoutSummary from '../../components/order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/Index';

class checkout extends Component{


    CheckoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    CheckoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    
    render() {

        let summary = <Redirect to="/"/>
        if(this.props.ings){
            const purchasedRedirect = this.props.purchasing ? <Redirect to="/"/> : null;
            summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary 
                    ingredients= {this.props.ings}
                    CheckoutCancelled = {this.CheckoutCancelledHandler}
                    CheckoutContinued = {this.CheckoutContinuedHandler}/>

                <Route path={this.props.match.path + "/contact-data"} 
                       component = {ContactData}/>  

             </div>      
            );
        }
        return summary;
                

            
    }

}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        purchasing: state.order.purchasing
    };
};


export default connect(mapStateToProps)(checkout);