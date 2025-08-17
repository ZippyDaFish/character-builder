import React from "react";
import styles from "../styles/customButton.css";

export default function CustomButton( { onClick, label, classes } ) {
    return (
        <button onClick={onClick} className={classes}>{label}</button>
    )
}