import React from 'react';

function Alert(props) {
    // Function to capitalize the first letter of a word
    const capitalize = (word) => {
        if (word === "danger") {
            word = "error";
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    return (
        // Display an alert if it exists in props
        <>
            {props.alert && (
                <div className={`alert ${props.alert.type === "success" ? "alert-success" : "alert-danger"}`} role="alert">
                    <strong>{capitalize(props.alert.type)}</strong> : <strong>{capitalize(props.alert.msg)}</strong>
                </div>
            )}
        </>
    )
}

export default Alert;