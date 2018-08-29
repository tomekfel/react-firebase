import React, {Component} from 'react';
import { 
    Link,
    withRouter,
} from 'react-router-dom';

import { auth } from '../firebase';
import * as routes from '../constants/routes';


const SignInPage = ({history}) =>
    <div>
        <h1>Sign In Page</h1>
        <SignInForm history={history} />
    </div>

const INITIAL_STATE = {
    email : '',
    passwordOne : '',
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
}) 


class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = (event) => {
        const {
            email,
            passwordOne,
        } = this.state;

        const { history } = this.props;

        auth.doSignInWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState({...INITIAL_STATE});
                history.push(routes.HOME);
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            })

        event.preventDefault();
    }

    render() {
        const {
            email,
            passwordOne,
            error,
        } = this.state;

        const isInvalid = 
        email === '' || passwordOne === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    value={passwordOne}
                    onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                    type="password"
                    placeholder="Password"
                />
                <button disabled={isInvalid} type="submit">
                    Sign In
                </button>

                { error && <p>{error.message}</p> }
            
            </form>
        );
    }
}

const SignInLink = () =>
    <p>
        Forget your password?
        {' '}
        <Link to={routes.PASSWORD_FORGET}>Remind Me</Link>
    </p>

export default withRouter(SignInPage);

export {
    SignInForm,
    SignInLink,
}