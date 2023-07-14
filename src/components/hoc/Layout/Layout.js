import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import classes from './Layout.css'
import React, { Component } from 'react';
import Loading from "../Loading/Loading";
import { useState } from 'react';
import Notify from '../Notify/Notify';

export default function Layout(ComposedComponent) {
    //#region LoadingService
    const [isLoading, setIsLoading] = useState(false);
    const startLoading = () => { setIsLoading(true) };
    const stopLoading = () => { setIsLoading(false) };
    const loadingService = {
        startLoading,
        stopLoading,
    }
    //#endregion LoadingService

    //#region NotifyService
    const [isSuccess, setIsSuccess] = useState(false);
    const [showNotify, setShowNotify] = useState(false);
    const [notifyMessage, setNotifyMessage] = useState('');
    const notify = (isSuccess, message) => {
        setShowNotify(true);
        setNotifyMessage(message);
        setIsSuccess(isSuccess);
        setTimeout(() => {
            setShowNotify(false);
            setNotifyMessage('');
        }, 1000);
    }
    const success = (message) => {
        notify(true, message);
    }
    const error = (message) => {
        notify(false, message);
    }
    const notifyService = {
        success,
        error,
    }
    //#endregion NotifyService
    
    class Children extends Component {
        render() {
            return(
                <div className={classes.Layout}>
                    <Notify show={showNotify} message={notifyMessage} isSuccess={isSuccess}/>
                    <Loading isLoading={isLoading}/>
                    <Header user={this.props.user}/>
                    <ComposedComponent {...this.props} loadingService={loadingService} notifyService={notifyService}/>
                    <Footer />
                </div>
            )
        }
    }

    return Children;
}