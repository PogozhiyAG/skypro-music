"use client"
import React, { FC, MouseEventHandler } from 'react';
import styles from "./StyledButton.module.css";
import cn from "classnames"

export enum ButtonStyle {
    Primary = 0,
    Secondary = 1
}

export type StyledButtonProps = {
    children?: React.ReactNode,   
    buttonStyle?: ButtonStyle,
    classes?: string,
    onClick?: MouseEventHandler
}

export const StyledButton : FC<StyledButtonProps> = ({
    children,
    buttonStyle = ButtonStyle.Primary,
    classes = '',
    onClick = e => {}
}) => {
    const buttonClass = [styles.buttonPrimary, styles.buttonSecondary][buttonStyle]
    const allClasses = cn(buttonClass, classes);

    return (
        <button className={allClasses} onClick={onClick}>
            {children}
        </button>
    );
}