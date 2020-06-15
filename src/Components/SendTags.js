import React from "react";
import "../Styles/sendTags.scss";
import dompurify from "dompurify";
import { useSelector, useDispatch } from "react-redux";
import {
    updateSent,
    clearInput,
    changeHandle,
    submitHandle,
    resetRecipients,
    checkForErrors,
    resetErrors,
} from "../Redux/Actions/SendTagActions/SendTagActions";
import Modal from "./Modal";

export default function SendTags() {
    const {
        tags,
        sendType,
        config,
        sendTo,
        errors,
    } = useSelector((state) => state.SendTagReducer.SendTagReducers);

    // It is unsafe using dangerouslySetInnerHTML.
    // Using DOMPurify - DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, MathML and SVG.
    const sanitizer = dompurify.sanitize;
    const dangerousHTML = {
        __html: sanitizer(
            "People Configs (e.g. {“Spiderman”: [“hero”, “tough”, “smart”, “tall”]})"
        ),
    };

    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch(changeHandle(event));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

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
        <div className="sendTags-container">
            <form className="sendTags-form" onSubmit={handleSubmit}>
                <label>
                    <span className="labelName">
                        Tags (separated by commas)
                    </span>
                    <span className="error">
                        {errors["emptyTags"] && errors["emptyTags"]}
                    </span>
                    <input
                        placeholder="Enter TAGS separated by commas"
                        type="text"
                        name="tags"
                        value={tags}
                        onChange={handleChange}
                        onFocus={onFocus}
                    />
                </label>
                <label>
                    <span
                        className="labelName"
                        dangerouslySetInnerHTML={dangerousHTML}
                    />
                    <span className="error">
                        {errors["jsonAttributesError"] &&
                            errors["jsonAttributesError"]}
                    </span>
                    <span className="error">
                        {errors["notValidJSON"] && errors["notValidJSON"]}
                    </span>
                    <textarea
                        placeholder="Enter a valid JSON format People Config"
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
                    <span className="labelName">Send To</span>
                    <span className="error">
                        {errors["emptySendTo"] && errors["emptySendTo"]}
                    </span>
                    <input
                        placeholder="Enter send to tags separated by commas"
                        type="text"
                        name="sendTo"
                        value={sendTo}
                        onChange={handleChange}
                        onFocus={onFocus}
                    />
                </label>
                <label>
                    <span className="labelName">AND/OR?</span>
                    <span className="error">
                        {errors["emptyOrAnd"] && errors["emptyOrAnd"]}
                    </span>
                    <span className="error">
                        {errors["notOrAnd"] && errors["notOrAnd"]}
                    </span>
                    <input
                        placeholder="Enter AND or OR"
                        type="text"
                        name="sendType"
                        value={sendType}
                        onChange={handleChange}
                        onFocus={onFocus}
                    />
                </label>
                <input
                    className="submit-button"
                    type="submit"
                    value="Send Messages"
                />
            </form>
            <Modal />
        </div>
    );
}
