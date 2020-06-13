import {
    UPDATE_TAGS,
    UPDATE_CONFIG,
    UPDATE_SEND_TO,
    UPDATE_SEND_TYPE,
    UPDATE_SENT,
    UPDATE_RECIPIENTS,
    CLEAR_STATE
} from '../../Actions/SendTagActions/SendTagActions';

const initialState = {
    recipients: new Set(),
    tags: '',
    config: '',
    sendTo: '',
    sendType: '',
    sent: false,
    errors: {}
}

const SendTagReducers = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case UPDATE_TAGS:
            return {
                ...state,
                tags: payload
            };
        case UPDATE_CONFIG:
            return {
                ...state,
                config: payload
            };
        case UPDATE_SEND_TO:
            return {
                ...state,
                sendTo: payload
            };
        case UPDATE_SEND_TYPE:
            return {
                ...state,
                sendType: payload
            };
        case UPDATE_SENT:
            return {
                ...state,
                sent: payload
            };
        case UPDATE_RECIPIENTS:
            return {
                ...state,
                recipients: state.recipients.add(payload)
            };
        case CLEAR_STATE:
            return {
                ...state,
                tags: '',
                config: '',
                sendTo: '',
                sendType: '',
                errors: {}
            }

        default:
            return {
                ...state,
            };
    }
}

export default SendTagReducers;