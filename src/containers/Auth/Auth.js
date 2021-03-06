import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/auth';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {updateObject, checkValidity } from '../../shared/utility';

import { Redirect } from 'react-router-dom';
class Auth extends Component{
    state={
        controls:{
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
                errorMessage:'Please enter a valid email'
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'password'
                },
                validation:{
                    required: true,
                    minLength: 7
                },
                valid: false,
                value: '',
                touched: false,
                errorMessage:'Min length: 7 Characters'
            },
        },
        isSignUp: true
    }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetRedirectPath('/');
        }
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

    inputChangedHandler = (event, controlName) =>{
        const updatedControls = updateObject(this.state.controls,{
            [controlName]: updateObject(this.state.controls[controlName],{
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true,
            }) 
        })
        
        this.setState({controls: updatedControls});
    }

    submitHandler =(event) =>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthModeHandler = () =>{
        this.setState(prevState =>{
            return{isSignUp: !prevState.isSignUp};
        })
    }

    render(){
        let formElementsArray =[];
        for (let key in this.state.controls){
            // crear los elementos aca
            formElementsArray.push({
                id:key,
                config: this.state.controls[key]
            })
        }
        let form = formElementsArray.map(formElement =>(
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig} 
                value={formElement.config.value}
                changed={ (event) => this.inputChangedHandler(event, formElement.id)}
                shouldValidate={formElement.config.validation}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                errorMessage={formElement.config.errorMessage}
                />
            
        ))

        if(this.props.loading){
            form = <Spinner />
        }
        
        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;
        if(this.props.isAuthenticated){
            console.log("a.go");
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        return(
            
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                    
                </form>
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}> SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>

            </div>

        )
    }
}

const mapStateToProps = state =>{
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,

    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetRedirectPath: (path) =>dispatch(actions.setAuthRedirectPath(path)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);