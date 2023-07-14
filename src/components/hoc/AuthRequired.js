import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { getUser } from '../../helper/auth';
import { LOGOUT } from '../../store/actions';
import ApiService from '../../helper/api';
import * as jwt from 'jsonwebtoken';
import { SAVEUSER } from "../../store/actions"

export default function AuthRequired(ComposedComponent) {
    const history = useHistory()
    const dispatch = useDispatch()
    class Authentication extends Component {
        getUserInfo = async () => {
            if (!this.props.token) {
                return history.push({
                    pathname: '/login',
                    state: {errorMsg: 'Require login'}
                });
            }

            try {
                const decodedToken=jwt.decode(this.props.token, {complete: true});
                if(decodedToken.exp < (new Date()).getTime()) throw 'Expired login';
                if(this.props.user) return;
                const result = await getUser(this.props.token);
                return dispatch({type: SAVEUSER, user: result});
            } catch (error) {
                this.props.logout()
                return history.push({
                    pathname: '/login',
                    state: {errorMsg: 'Expired login'}
                });
            }
        }

        componentWillMount() {
            this.getUserInfo()
        }

        componentWillUpdate(nextProps) {
            if (this.props.token !== nextProps.token) {
                this.getUserInfo()
            }
        }

        render() {
            return this.props.user ? <ComposedComponent user={this.props.user} apiService={new ApiService(this.props.token, history, dispatch)}/> : <Spinner animation="grow" />
        }
    }

    const mapStateToProps = (state) => {
        return { token: state.token, user: state.user };
    }

    const mapDispathToProps = (dispath) => {
        return {
            logout: () => dispath({ type: LOGOUT })
        }
    }

    return connect(mapStateToProps, mapDispathToProps)(Authentication);
}