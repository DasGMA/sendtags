import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    updateTags,
    updateConfig,
    updateSendTo,
    updateSendType,
    updateSent,
    updateRecipients,
    clearState,
} from "../Redux/Actions/SendTagActions/SendTagActions";

export default function SendTags() {
    const { tags, sent, sendType, config, sendTo, recipients } = useSelector(
        (state) => state.SendTagReducer.SendTagReducers
    );
    console.log({sent, sendTo, sendType, config, recipients})
    const dispatch = useDispatch();

    const handleChange = (event) => {
        // Checking for spaces in TAGS and SEND TO but need think better about that,
        // as tags can be not just one worded.
        if (
            event.currentTarget.value.includes(" ") &&
            (event.target.name === "tags" || event.target.name === "sendTo")
        ) {
            event.currentTarget.value = event.currentTarget.value.replace(
                /\s/g,
                ""
            );
        }
        const value = event.target.value;

        switch (event.target.name) {
            case "tags":
                dispatch(updateTags(value));
                return;
            case "config":
                dispatch(updateConfig(value));
                return;
            case "sendTo":
                dispatch(updateSendTo(value));
                return;
            case "sendType":
                dispatch(updateSendType(value));
                return;
            default:
                return;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        /*  implement me
            hint: we will probably need to update state here to render the right parts
        */
        // No external library needed to parse the JSON string to object.
        // React is javascript so use JSON.parse()

        const obj = JSON.parse(config);
        const tagsArray = sendTo.split(",");

        // OR
        if (sendType.toLocaleLowerCase() === "or") {
            for (const person of Object.entries(obj)) {
                for (const tag of tagsArray) {
                    if (person[1].includes(tag)) {
                        dispatch(updateRecipients(person[0]));
                    }
                }
            }
        }
        // AND
        if (sendType.toLocaleLowerCase() === "and") {
            for (const person of Object.entries(obj)) {
                if (tagsArray.every((tag) => person[1].includes(tag))) {
                    dispatch(updateRecipients(person[0]));
                }
            }
        }

        dispatch(updateSent(true));
        dispatch(clearState());
    };

    const onFocus = () => {
        updateRecipients(new Set());
        dispatch(updateSent(false));
    };

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
                <label style={{ paddingRight: "10px" }}>
                    <div>
                        <span style={{ paddingRight: "10px" }}>
                            Tags (separated by commas):
                        </span>
                        <input
                            type="text"
                            name="tags"
                            value={tags}
                            onChange={handleChange}
                            onFocus={onFocus}
                        />
                    </div>
                    <div>
                        <span
                            style={{ paddingRight: "10px", paddingTop: "20px" }}
                            dangerouslySetInnerHTML={{
                                __html:
                                    "People Configs (e.g. {“Spiderman”: [“hero”, “tough”, “smart”, “tall”]}): ",
                            }}
                        ></span>
                        <input
                            type="text"
                            name="config"
                            value={config}
                            style={{ width: "500px" }}
                            onChange={handleChange}
                            onFocus={onFocus}
                        />
                    </div>
                    <div>
                        <span
                            style={{ paddingRight: "10px", paddingTop: "20px" }}
                        >
                            Send To:
                        </span>
                        <input
                            type="text"
                            name="sendTo"
                            value={sendTo}
                            onChange={handleChange}
                            onFocus={onFocus}
                        />
                    </div>
                    <div>
                        <span
                            style={{ paddingRight: "10px", paddingTop: "20px" }}
                        >
                            AND/OR?:{" "}
                        </span>
                        <input
                            type="text"
                            name="sendType"
                            value={sendType}
                            onChange={handleChange}
                            onFocus={onFocus}
                        />
                    </div>
                </label>
                <input type="submit" value="Send Messages" />
            </form>
            {sent && (
                <div>
                    Sent to:{" "}
                    {recipients.size < 1
                        ? "There are no matching TAGS."
                        : [...recipients].join(", ")}
                </div>
            )}
        </div>
    );
}
