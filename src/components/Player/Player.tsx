"use client"
import Link from "next/link";
import styles from "./Player.module.css";
import cn from 'classnames'

export const Player = () => {
    return (
        <div className={styles.bar}>
        <div className={styles.bar__content}>
          <div className={styles.bar__playerProgress} />
          <div className={styles.bar__playerBlock}>
            <div className={cn(styles.bar__player, styles.player)}>
              <div className={styles.player__controls}>
                <div className={styles.player__btnPrev}>
                  <svg className={styles.player__btnPrevSvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-prev" />
                  </svg>
                </div>
                <div className={styles.player__btnPlay}>
                  <svg className={styles.player__btnPlaySvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-play" />
                  </svg>
                </div>
                <div className={styles.player__btnNext}>
                  <svg className={styles.player__btnNextSvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-next" />
                  </svg>
                </div>
                <div className={cn(styles.player__btnRepeat, styles._btnIcon)}>
                  <svg className={styles.player__btnRepeatSvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-repeat" />
                  </svg>
                </div>
                <div className={cn(styles.player__btnShuffle, styles._btnIcon)}>
                  <svg className={styles.player__btnShuffleSvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-shuffle" />
                  </svg>
                </div>
              </div>
              <div className={cn(styles.player__trackPlay, styles.trackPlay)}>
                <div className={styles.trackPlay__contain}>
                  <div className={styles.trackPlay__image}>
                    <svg className={styles.trackPlay__svg}>
                      <use xlinkHref="img/icon/sprite.svg#icon-note" />
                    </svg>
                  </div>
                  <div className={styles.trackPlay__author}>
                    <Link className={styles.trackPlay__authorLink} href="/">
                      Ты та...
                    </Link>
                  </div>
                  <div className={styles.trackPlay__album}>
                    <Link className={styles.trackPlay__albumLink} href="/">
                      Баста
                    </Link>
                  </div>
                </div>
                <div className={styles.trackPlay__likeDis}>
                  <div className={cn(styles.trackPlay__like, styles._btnIcon)}>
                    <svg className={styles.trackPlay__likeSvg}>
                      <use xlinkHref="img/icon/sprite.svg#icon-like" />
                    </svg>
                  </div>
                  <div className={cn(styles.trackPlay__dislike, styles._btnIcon)}>
                    <svg className={styles.trackPlay__dislikeSvg}>
                      <use xlinkHref="img/icon/sprite.svg#icon-dislike" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
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
          </div>
        </div>
      </div>
    );
}