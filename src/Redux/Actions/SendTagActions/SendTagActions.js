
export const UPDATE_TAGS = 'UPDATE_TAGS';
export const UPDATE_CONFIG = 'UPDATE_CONFIG';
export const UPDATE_SEND_TO = 'UPDATE_SEND_TO';
export const UPDATE_SEND_TYPE = 'UPDATE_SEND_TYPE';
export const UPDATE_SENT = 'UPDATE_SENT';
export const UPDATE_RECIPIENTS = 'UPDATE_RECIPIENTS';
export const CLEAR_INPUT = 'CLEAR_INPUT';
export const RESET_RECIPIENTS = 'RESET_RECIPIENTS';
export const SET_ERRORS = 'SET_ERRORS';
export const RESET_ERRORS = 'RESET_ERRORS';

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

export const resetRecipients = () => dispatch => {
    dispatch({
        type: RESET_RECIPIENTS
    })
}

export const clearInput = () => dispatch => {
    dispatch({
        type: CLEAR_INPUT
    })
}

export const submitHandle = () => (dispatch, getState) => {
    const {config, sendTo, sendType} = getState().SendTagReducer.SendTagReducers;

    // No external library needed to parse the JSON string to object.
    // React is javascript so use JSON.parse()

    const obj = JSON.parse(config);
    const tagsArray = sendTo.split(',');

    // OR
    if (sendType.toLocaleLowerCase() === 'or') {
        for (const person of Object.entries(obj)) {
            for (const tag of tagsArray) {
                if (person[1].includes(tag)) {
                    dispatch(updateRecipients(person[0]));
                }
            }
        }
    }
    // AND
    if (sendType.toLocaleLowerCase() === 'and') {
        for (const person of Object.entries(obj)) {
            if (tagsArray.every((tag) => person[1].includes(tag))) {
                dispatch(updateRecipients(person[0]));
            }
        }
    }
}

export const setErrors = (errorName, message) => dispatch => {
    const error = {errorName, message};
    dispatch({
        type: SET_ERRORS,
        payload: error
    })
}

export const resetErrors = () => dispatch => {
    dispatch({
        type: RESET_ERRORS
    })
}


export const checkForErrors = () => (dispatch, getState) =>{
    const {tags, config, sendTo, sendType} = getState().SendTagReducer.SendTagReducers;
    let hasErrors = false;
    let obj = {};
    // TAGS
    // Check if TAGS input is empty.
    const emptyTags = 'TAGS is a required field.';
    if (tags.length === 0) {
        dispatch(setErrors('emptyTags', emptyTags)); 
        hasErrors = true;
    };


    // JSON
    // Check if JSON is valid JSON format.
    const notValidJSON = 'SyntaxError: Unexpected end of JSON input.';
    try {
        obj = JSON.parse(config);
    } catch (error) {
        dispatch(setErrors('notValidJSON', notValidJSON));
        hasErrors = true;
    }
    // Checking JSON user tags/attributes to entered TAGS,
    // If JSON user tags/Attributes contains a tag that is not in the TAGS list
    // Throws an error.
    const jsonAttributesError = 'One or more user attributes are not in the TAGS list.';
    
    const tagsArray = tags.split(',');

    for (const user of Object.entries(obj)) {
        if (!user[1].every(tag => tagsArray.includes(tag))) {
            dispatch(setErrors('jsonAttributesError', jsonAttributesError));
            hasErrors = true;
        }
    }

    // SEND TO
    // Check if sendType is not empty
    const emptySendTo = 'Send To field is required. Must not be blank.';
    if (sendTo.length === 0) {
        dispatch(setErrors('emptySendTo', emptySendTo));
        hasErrors = true;
    };

    // SEND TYPE
    const emptyOrAnd = 'Send To field is required. Must not be blank.';
    const notOrAnd = 'Must be OR or AND.';
    if (sendType.length === 0) {
        dispatch(setErrors('emptyOrAnd', emptyOrAnd));
        hasErrors = true;
        if (sendType.toLocaleLowerCase() !== 'or' || sendType.toLocaleLowerCase() !== 'and') {
            dispatch(setErrors('notOrAnd', notOrAnd));
            hasErrors = true;
        }
    };
    


    return hasErrors;
}