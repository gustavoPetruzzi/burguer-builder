import React, {Component} from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
class ContactData extends Component{
    state={
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false,

    }

    orderHandler = (event) =>{
        event.preventDefault();
        

        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer:{
                name:'yusti',
                adress:{
                    street:'algun lugar 1',
                    zipCode:'1234',
                    country:'Argentina'
                },
                email:'test@test.com',
                delivery:'lento'
            }
        }
            axios.post('/orders.', order)
                .then(response =>{
                    console.log(response);
                    
                })
                .catch(error =>{
                    console.log(error);
                    
                })
                .finally(finllay =>{
                    this.setState({loading: false, purchasing: false});
                })
    }

    render(){
        return (
            <div className={classes.ContactData}>
                <h4> Enter your contact data</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Street" />
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal code" />
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;