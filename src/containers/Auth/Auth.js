import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';


class Auth extends Component{
    state={
        control:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Mail Address'
                },
                validation:{
                    required: true,
                    isEmail: true
                },
                valid: false,
                value: '',
                touched: false,
                errorMessage:'Please enter a valid name'
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'password required'
                },
                validation:{
                    required: true,
                    minLength: 7
                },
                valid: false,
                value: '',
                touched: false,
                errorMessage:'Please enter a valid name'
            },
        }
    }
    render(){
        return(
            <div>
                <form>

                </form>

            </div>

        )
    }
}

export default Auth;