"use client"
import styles from "./VolumeBar.module.css";
import cn from "classnames"

export const VolumeBar = () => {
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
                        name="range"
                    />
                </div>
            </div>
        </div>
    );
}