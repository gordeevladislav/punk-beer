import React, { Component } from 'react'
import classes from './Auth.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import { connect } from 'react-redux'
import { auth } from '../../store/actions/auth'
import { controlValidate } from '../../input/inputFramework'

class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        placeholder: 'Enter email',
        errorMessage: 'Enter correct email',
        valid: false,
        touched: false,
        validation: {
          reqiured: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        placeholder: 'Enter password',
        errorMessage: 'Enter correct password',
        valid: false,
        touched: false,
        validation: {
          reqiured: true,
          minLength: 8
        }
      }
    }
  }

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    )
  }

  registerHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    )
  }

  submitHandler = (e) => {
    e.preventDefault()
  }

  onChangeHandler = (e, controlName) => {
    const formControls = {...this.state.formControls}
    const control = { ...formControls[controlName] }

    control.value = e.target.value
    control.value === ''
      ? control.touched = false
      : control.touched = true

    control.valid = controlValidate(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true

    Object.keys(formControls).forEach(name => {
      if (!formControls[name].valid) {
        isFormValid = false
      }
    })

    this.setState({
      formControls,
      isFormValid
    })
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          placeholder={control.placeholder}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={e => this.onChangeHandler(e, controlName)}
        />
      )
    })
  }

  render() {
    return (
      <div className={classes.Auth}>
        <h1>Log in to system</h1>
        <form onSubmit={e => this.submitHandler(e)}>

          { this.renderInputs() }

          <div className={classes.ButtonWrapper}>
            <Button
              type="button"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
              classes={classes.Auth}
            >Log In</Button>
            <Button
              type="button"
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
              classes={classes.Auth}
            >Sign Up</Button>
          </div>
          {
            this.props.loginError.value
              ? <span className={classes.ErrorMessage}>{ this.props.loginError.message }</span>
              : null
          }
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loginError: state.auth.error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)