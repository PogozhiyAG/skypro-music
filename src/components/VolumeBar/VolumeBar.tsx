"use client"
import { ChangeEventHandler, useEffect, useRef } from "react";
import styles from "./VolumeBar.module.css";
import cn from "classnames"

export type VolumeBarProps = {    
    value: number,
    onChange: ChangeEventHandler<HTMLInputElement>
}

export const VolumeBar: React.FC<VolumeBarProps> = ({ value, onChange }) => {

    const background = `linear-gradient(to right, #fff 0%, #fff ${value * 100}%, #797979 ${value * 100}%, #797979 100%)`;

    

    return (
        <div className={cn(styles.bar__volumeBlock, styles.volume)}>
            <div className={styles.volume__content}>
                <div className={styles.volume__image}>
                    <svg className={styles.volume__svg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-volume" />
                    </svg>
                </div>
                <div className={styles.volume__progress}>
                    <input                        
                        className={styles.volume__progressLine}
                        type="range"
                        max={1.0}
                        step={0.01}
                        value={value}
                        onChange={onChange}
                        style={{background: background}}                
                    />
                </div>
            </div>
        </div>
    );
}