import React from 'react';
import '../Styles/modal.scss';
import {useSelector, useDispatch} from 'react-redux';
import { updateSent, resetRecipients, resetErrors } from '../Redux/Actions/SendTagActions/SendTagActions';

export default function Modal() {
    const {sent, recipients} = useSelector(
        (state) => state.SendTagReducer.SendTagReducers
        );
    const dispatch = useDispatch();

    const animatedModal = {
        display: sent ? 'flex' : 'none', animation: 'fade 0.5s'
    }

    const closeModal = () => {
        dispatch(resetRecipients());
        dispatch(updateSent(false));
        dispatch(resetErrors());
    }

    const getRecipients = () => {
        return [...recipients].map(recipient => {
            return <li key={recipient}>{recipient}</li>
        })
    }

    return (
        <div className='modal-container' style={animatedModal} onClick={closeModal}>
            <div className='inner-modal'>
                <h1>Sent to:</h1>
                    {recipients.size < 1
                        ? <p>There are no matching TAGS.</p>
                        : <ul>{getRecipients()}</ul>}
                
            </div>
            <div className='button-container'>
                <button 
                    className='close-button'
                    onClick={closeModal}
                >X</button>
            </div>
        </div>
    )
}