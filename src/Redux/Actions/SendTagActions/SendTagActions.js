
export const UPDATE_TAGS = 'UPDATE_TAGS';
export const UPDATE_CONFIG = 'UPDATE_CONFIG';
export const UPDATE_SEND_TO = 'UPDATE_SEND_TO';
export const UPDATE_SEND_TYPE = 'UPDATE_SEND_TYPE';
export const UPDATE_SENT = 'UPDATE_SENT';
export const UPDATE_RECIPIENTS = 'UPDATE_RECIPIENTS';
export const CLEAR_STATE = 'CLEAR_STATE';

export const updateTags = (value) => dispatch => {
    dispatch({
        type: UPDATE_TAGS,
        payload: value
    })
}

export const updateConfig = (value) => dispatch => {
    dispatch({
        type: UPDATE_CONFIG,
        payload: value
    })
}

export const updateSendTo = (value) => dispatch => {
    dispatch({
        type: UPDATE_SEND_TO,
        payload: value
    })
}

export const updateSendType = (value) => dispatch => {
    dispatch({
        type: UPDATE_SEND_TYPE,
        payload: value
    })
}

export const updateSent = (value) => dispatch => {
    dispatch({
        type: UPDATE_SENT,
        payload: value
    })
}

export const updateRecipients = (value) => dispatch => {
    dispatch({
        type: UPDATE_RECIPIENTS,
        payload: value
    })
}

export const clearState = () => dispatch => {
    dispatch({
        type: CLEAR_STATE
    })
}

export const change = () => (dispatch, getState) => {
    const {config, sendTo, recipients, sendType} = getState().SendTagReducers.SendTagReducer;

    // No external library needed to parse the JSON string to object.
    // React is javascript so use JSON.parse()

    const obj = JSON.parse(config);
    const tagsArray = sendTo.split(",");

    // OR
    if (sendType.toLocaleLowerCase() === "or") {
        for (const person of Object.entries(obj)) {
            for (const tag of tagsArray) {
                if (person[1].includes(tag)) {
                    updateRecipients(recipients.add(person[0]));
                }
            }
        }
    }
    // AND
    if (sendType.toLocaleLowerCase() === "and") {
        for (const person of Object.entries(obj)) {
            if (tagsArray.every((tag) => person[1].includes(tag))) {
                updateRecipients(recipients.add(person[0]));
            }
        }
    }
}