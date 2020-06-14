import React from "react";
import '../Styles/sendTags.scss';
import dompurify from 'dompurify';
import { useSelector, useDispatch } from "react-redux";
import {
    updateTags,
    updateConfig,
    updateSendTo,
    updateSendType,
    updateSent,
    clearInput,
    submitHandle,
    resetRecipients,
    checkForErrors,
    resetErrors
} from "../Redux/Actions/SendTagActions/SendTagActions";

export default function SendTags() {
    const { tags, sent, sendType, config, sendTo, recipients, errors } = useSelector(
        (state) => state.SendTagReducer.SendTagReducers
    );

    // It is unsafe using dangerouslySetInnerHTML.
    // Using DOMPurify - DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, MathML and SVG.
    const sanitizer = dompurify.sanitize;
    const dangerousHTML = {__html: sanitizer("People Configs (e.g. {“Spiderman”: [“hero”, “tough”, “smart”, “tall”]})")}
    
    const dispatch = useDispatch();

    const handleChange = (event) => {
        // Checking for spaces in TAGS and SEND TO but need think better about that,
        // as tags can be not just one worded.
        if (
            event.currentTarget.value.includes(' ') &&
            (event.target.name === 'tags' || event.target.name === 'sendTo' || event.target.name === 'sendType')
        ) {
            event.currentTarget.value = event.currentTarget.value.replace(
                /\s/g,
                ""
            );
        }
        const value = event.target.value;

        switch (event.target.name) {
            case 'tags':
                dispatch(updateTags(value));
                return;
            case 'config':
                dispatch(updateConfig(value));
                return;
            case 'sendTo':
                dispatch(updateSendTo(value));
                return;
            case 'sendType':
                dispatch(updateSendType(value));
                return;
            default:
                return;
        }
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        /*  implement me
            hint: we will probably need to update state here to render the right parts
        */
        
        if (dispatch(checkForErrors()) === false) {
            dispatch(submitHandle());
            dispatch(updateSent(true));
            dispatch(clearInput());
        }
        
    };

    const onFocus = (event) => {
        event.preventDefault();
        dispatch(resetRecipients());
        dispatch(updateSent(false));
        dispatch(resetErrors());
    };
    
    return (
        <div className='sendTags-container'>
            <form className='sendTags-form' onSubmit={handleSubmit}>
                <label>
                    <span className='labelName'>Tags (separated by commas)</span>
                    <span className='error'>{errors['emptyTags'] && errors['emptyTags']}</span>
                    <input
                        placeholder='Enter TAGS separated by commas'
                        type="text"
                        name="tags"
                        value={tags}
                        onChange={handleChange}
                        onFocus={onFocus}
                    />
                </label>
                <label>
                    <span className='labelName' dangerouslySetInnerHTML={dangerousHTML} />
                    <span className='error'>{errors['jsonAttributesError'] && errors['jsonAttributesError']}</span>
                    <span className='error'>{errors['notValidJSON'] && errors['notValidJSON']}</span>
                    <textarea
                        placeholder='Enter a valid JSON format People Config'
                        rows={4}
                        cols={50}
                        type="text"
                        name="config"
                        value={config}
                        onChange={handleChange}
                        onFocus={onFocus}
                    />
                </label>
                <label>
                    <span className='labelName'>Send To</span>
                    <span className='error'>{errors['emptySendTo'] && errors['emptySendTo']}</span>
                    <input
                        placeholder='Enter send to tags separated by commas'
                        type="text"
                        name="sendTo"
                        value={sendTo}
                        onChange={handleChange}
                        onFocus={onFocus}
                    />
                </label>
                <label>
                    <span className='labelName'>AND/OR?</span>
                    <span className='error'>{errors['emptyOrAnd'] && errors['emptyOrAnd']}</span>
                    <span className='error'>{errors['notOrAnd'] && errors['notOrAnd']}</span>
                    <input
                        placeholder='Enter AND or OR'
                        type="text"
                        name="sendType"
                        value={sendType}
                        onChange={handleChange}
                        onFocus={onFocus}
                    />
                </label>
                <input className='submit-button' type="submit" value="Send Messages" />
            </form>
            {sent && (
                <div>
                    <p>Sent to:{" "}
                    {recipients.size < 1 ? "There are no matching TAGS."
                        : [...recipients].join(", ")}</p>
                </div>
            )}
        </div>
    );
}
