"use client"
import Link from "next/link";
import styles from "./PlaylistItem.module.css";
import cn from 'classnames'
import { TrackInfo } from "@/types/TrackInfo";
import { formatDuration } from "@/utils";


export interface PlaylistItemProps {
    track: TrackInfo
}

export const PlaylistItem: React.FC<PlaylistItemProps> = ({track}) => {
    
    const formattedDuration = formatDuration(track.duration_in_seconds);

    return(
        <div className={styles.playlist__item}>
            <div className={cn(styles.playlist__track, styles.track)}>
                <div className={styles.track__title}>
                    <div className={styles.track__titleImage}>
                    <svg className={styles.track__titleSvg}>
                        <use xlinkHref="img/icon/sprite.svg#icon-note" />
                    </svg>
                    </div>
                    <div className={styles.track__titleText}>
                    <Link className={styles.track__titleLink} href="/">
                        {track.name}
                    </Link>
                    </div>
                </div>
                <div className={styles.track__author}>
                    <Link className={styles.track__authorLink} href="/">
                        {track.author}
                    </Link>
                </div>
                <div className={styles.track__album}>
                    <Link className={styles.track__albumLink} href="/">
                        {track.album}
                    </Link>
                </div>
                <div className={styles.track__time}>
                    <svg className={styles.track__timeSvg}>
                        <use xlinkHref="img/icon/sprite.svg#icon-like" />
                    </svg>
                    <span className={styles.track__timeText}>{formattedDuration}</span>
                </div>
            </div>
        </div>
    );
}