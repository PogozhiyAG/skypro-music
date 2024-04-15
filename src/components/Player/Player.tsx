"use client"
import Link from "next/link";
import styles from "./Player.module.css";
import cn from 'classnames'
import { VolumeBar } from "../VolumeBar/VolumeBar";
import { TrackInfo } from "@/types/TrackInfo";
import { useEffect, useRef, useState } from "react";
import { ProgressBar } from "../ProgressBar/ProgressBar";

export type PlayerProps = {
  currentTrack: TrackInfo | null,
  autoPlay: boolean | null
}

export const Player: React.FC<PlayerProps> = ({currentTrack, autoPlay}) => {
  const audioRef = useRef<HTMLAudioElement>(null);  
  const [isPaused, setIsPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState<number>(0.5);

  const syncStatus = () => setIsPaused(audioRef.current?.paused ?? true);

  const setAudioCurrentTime = (value: number) => {
    if(audioRef?.current){
      audioRef.current.currentTime = value
    }
  }
    
  useEffect(() => {
    syncStatus();
  }, []);

  const play = () => audioRef?.current?.play();
  const pause = () => audioRef?.current?.pause();
 


  const audioTimeupdate = (e) => {
    syncStatus();
    setCurrentTime(e.currentTarget.currentTime);
  }
  const audioPlay = () => {
    syncStatus();
  }
  const audioPause = () => {
    syncStatus();
  }
  const audioEnded = () => {
    syncStatus();
  }


  useEffect(() => {
    if(!audioRef.current){
      return;
    }

    audioRef.current.addEventListener('timeupdate', audioTimeupdate);
    audioRef.current.addEventListener('play', audioPlay);
    audioRef.current.addEventListener('pause', audioPause);
    audioRef.current.addEventListener('ended', audioEnded);

    const audio = audioRef.current;

    return () => {
      audio?.removeEventListener('timeupdate', audioTimeupdate);
      audio?.removeEventListener('play', audioPlay);
      audio?.removeEventListener('pause', audioPause);
      audio?.removeEventListener('ended', audioEnded);
    }
  }, []);


  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.volume = volume;
    }
  }, [volume]);
  

  const authorAndAlbum = currentTrack ? `${currentTrack.author} / ${currentTrack.album}` : '';
  const duration = audioRef.current?.duration || 0;

  return (
      <div className={styles.bar}>
        
        <audio 
          ref={audioRef} 
          style={{display: 'none'}} 
          src={currentTrack?.track_file} 
          autoPlay={autoPlay ?? false}           
          controls>          
        </audio>

        <div className={styles.bar__content}>
          
          <ProgressBar
            max={duration}
            value={currentTime}
            step={0.01}
            onChange={(e) => setAudioCurrentTime(Number(e.target.value))}
          />

          <div className={styles.bar__playerBlock}>
            <div className={cn(styles.bar__player, styles.player)}>
              <div className={styles.player__controls}>
                <div className={styles.player__btnPrev}>
                  <svg className={styles.player__btnPrevSvg}>
                    <use xlinkHref="img/icon/sprite.svg#icon-prev" />
                  </svg>
                </div>

                

                {isPaused 
                  ? (
                      <div className={styles.player__btnPlay} onClick={() => play()}>
                        <svg className={styles.player__btnPlaySvg}>
                          <use xlinkHref="img/icon/sprite.svg#icon-play" />
                        </svg>
                      </div>
                    )
                  : (
                    <div className={styles.player__btnPlay} onClick={() => pause()}>
                      <svg className={styles.player__btnPlaySvg}>
                        <use xlinkHref="img/icon/sprite.svg#icon-pause" />
                      </svg>
                    </div>
                    )
                }
                

                

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

              <div className={cn(styles.player__trackPlay)}>
               
                <div className={styles.trackPlay__contain}>
                  <div className={styles.trackPlay__image}>
                    <svg className={styles.trackPlay__svg}>
                      <use xlinkHref="img/icon/sprite.svg#icon-note" />
                    </svg>
                  </div>
                  <div className={styles.trackPlay__name}>
                    {currentTrack?.name}
                  </div>
                  <div className={styles.trackPlay__album}>
                    {authorAndAlbum}
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

            <VolumeBar value={volume} onChange={(e) => setVolume(Number(e.target.value))}/>
          </div>
        </div>
    </div>
  );
}