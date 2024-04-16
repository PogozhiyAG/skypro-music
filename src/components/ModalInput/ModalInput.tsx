"use client"
import React, { ChangeEvent, FC } from 'react';
import styles from "./ModalInput.module.css";
import cn from "classnames"

interface ModalInputProps {
    type?: string;
    placeholder?: string;
    value?: string;
    classes?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const ModalInput: FC<ModalInputProps> = ({
    type = 'text',
    placeholder = '',
    value = '',
    classes = '',
    onChange = () => {}
}) => {
    return (
        <input
            className={cn(styles.modal__input, classes)}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};

