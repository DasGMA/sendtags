import React, { useState } from "react";

export default function SendTags() {
    const [recipients, updateRecipients] = useState("");
    const [tags, updateTags] = useState("");
    const [config, updateConfig] = useState("");
    const [sendTo, updateSendTo] = useState("");
    const [sendType, updateSendType] = useState("");
    const [sent, updateSent] = useState(false);

    const handleChange = (event) => {
        const value = event.target.value;
        switch (event.target.name) {
            case "tags":
                updateTags(value);
                return;
            case "config":
                updateConfig(value);
                return;
            case "sendTo":
                updateSendTo(value);
                return;
            case "sendType":
                updateSendType(value);
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
        const tagsArray = sendTo.split(',');
        const namesSet = new Set();

        // OR
        if (sendType.toLocaleLowerCase() === 'or') {
            for (const person of Object.entries(obj)) {
                for(const tag of tagsArray) {
                    if (person[1].includes(tag)) {
                        namesSet.add(person[0]);
                    }
                }
            }
        }
        // AND
        if (sendType.toLocaleLowerCase() === 'and') {
            for (const person of Object.entries(obj)) {
                if (tagsArray.every(tag=> person[1].includes(tag))) {
                    namesSet.add(person[0]);
                }
            }
        }
        
        updateRecipients([...namesSet].join(', '));
        updateSent(true);
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
                            onChange={handleChange}
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
                            style={{ width: "500px" }}
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
                        />
                    </div>
                </label>
                <input type="submit" value="Send Messages" />
            </form>
            {sent && <div>Sent to: {recipients}</div>}
        </div>
    );
}
