import React, {Component} from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/WithErrorHandler';
import { updateObject, checkValidity } from '../../../shared/utility'

class ContactData extends Component{
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                validation:{
                    required: true,
                },
                valid: false,
                value: '',
                touched: false,
                errorMessage:'Please enter a name'
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street',
                },
                validation:{
                    required: true,
                },
                valid: false,
                value:'',
                touched: false,
                errorMessage:'Please enter a valid street'
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP code',
                },
                validation:{
                    required: true,
                    minLength: 5,
                    maxLength: 6,
                },
                valid: false,
                value:'',
                touched: false,
                errorMessage:'Please enter a valid ZIP code '
            },
            //lista?
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                validation:{
                    required: true,
                },
                valid: false,
                value:'',
                touched: false,
                errorMessage:'Please enter a valid country'
            },

            email:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your E-mail'
                },
                validation:{
                    required: true,
                },
                valid: false,
                value:'',
                touched: false,
                errorMessage:'Please enter a valid email'
            },
            delivery: {
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest', displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'},
                    ]
                },
                value: 'fastest',
                valid: true,
                validation:{}
                
            },
            
        },
        formIsValid: false,
        

    }
    
    checkValidity = (value, rules) =>{
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;

        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputId) =>{

        const updatedFormElement = updateObject(this.state.orderForm[inputId],{
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputId].validation),
            touched: true
        })
        const updatedOrderForm = updateObject(this.state.orderForm,{
            [inputId]: updatedFormElement
        })

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;

        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    orderHandler = (event) =>{
        event.preventDefault();
        

        
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;

        }
        const order = {
            ingredients: this.props.ings,
            price: Number.parseFloat(this.props.prc).toFixed(2),
            orderData : formData,
            userId: this.props.userId
        }
        this.props.onOrderBurger(this.props.token, order);
    }

    render(){
        let formElementsArray =[];
        for (let key in this.state.orderForm){
            // crear los elementos aca
            formElementsArray.push({
                id:key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(el =>(
                    <Input 
                        key={el.id} 
                        elementType={el.config.elementType} 
                        elementConfig={el.config.elementConfig} 
                        value={el.config.value}
                        changed={ (event) => this.inputChangedHandler(event, el.id)}
                        shouldValidate={el.config.validation}
                        invalid={!el.config.valid}
                        touched={el.config.touched}
                        errorMessage={el.config.errorMessage}
                        />)
                )}
                <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER</Button>
            </form>
        );

        if(this.props.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4> Enter your contact data</h4>
                {form}
            </div>
        );
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onOrderBurger: (token,orderData) =>dispatch(actions.purchaseBurger(token,orderData))
    }
}
const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        prc: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));