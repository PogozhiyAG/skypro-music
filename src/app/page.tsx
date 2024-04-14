"use client"
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import cn from 'classnames'
import { TrackInfo } from "@/types/TrackInfo";
import { PlaylistItem } from "@/components/PlaylistItem/PlaylistItem";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "@/context/DataContext";
import { useFilterItem } from "@/hooks/useFilterItem";
import { FilterItem } from "@/components/FilterItem/FilterItem";

// const tracks: TrackInfo[] = [
//   {
//     id: 1,
//     name: "Song 01",
//     album: "The Main Things",
//     author: "Songerinio",
//     duration_in_seconds: 340,
//     genre: "Funky Jazz",
//     release_date : new Date("01.01.20019"),
//     track_file: ""
//   },
//   {
//     id: 2,
//     name: "Song 02",
//     album: "The Main Things",
//     author: "Songerinio",
//     duration_in_seconds: 206,
//     genre: "Funky Jazz",
//     release_date : new Date("09.01.20019"),
//     track_file: ""
//   },
// ];

export default function Home() {
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const {tracks, loadTracks} = useContext(DataContext);
  const [filteredTracks, setFilteredTracks] = useState([]);
  
  const playlistFilterAlbum = useFilterItem<TrackInfo, string>({
    dataSet: tracks,
    valueFunction: track => track.author,
    sortFunction: (a, b) => a.value.localeCompare(b.value)
  });

  const playlistFilterYear = useFilterItem<TrackInfo, number>({
    dataSet: tracks,
    valueFunction: track => track.release_date ? new Date(track.release_date).getFullYear() : -1,
    formatFunction: value => value === -1 ? '<Не указано>' : `${value}`,
    sortFunction: (a, b) => b.value - a.value
  });

  const playlistFilterGenre = useFilterItem<TrackInfo, string>({
    dataSet: tracks,
    valueFunction: track => track.genre,
    sortFunction: (a, b) => a.value.localeCompare(b.value)
  });

  useEffect(() => {
      const work = async () => {
          try{
              await loadTracks();
          } catch(error){
              setErrorMessage(error)
          }
          
          setIsLoading(false);
      }

      work();        
  }, []);


  useEffect(() => {
    const filtered = tracks.filter(t => 
         playlistFilterAlbum.isFit(t)
      && playlistFilterYear.isFit(t)
      && playlistFilterGenre.isFit(t)
    );
    setFilteredTracks(filtered)
  }, [playlistFilterAlbum.values, playlistFilterYear.values, playlistFilterGenre.values, tracks]);


  return (
    <div className={styles.wrapper}>
  <div className={styles.container}>
    <main className={styles.main}>
      <nav className={cn(styles.main__nav, styles.nav)}>
        <div className={cn(styles.nav__logo, styles.logo)}>
          <Image className={styles.logo__image} src="/img/logo.png" alt="" width={114} height={17}/>
        </div>
        <div className={cn(styles.nav__burger, styles.burger)}>
          <span className={styles.burger__line} />
          <span className={styles.burger__line} />
          <span className={styles.burger__line} />
        </div>
        <div className={cn(styles.nav__menu, styles.menu)}>
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <Link href="/" className={styles.menu__link}>
                Главное
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link href="/" className={styles.menu__link}>
                Мой плейлист
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link href="/signin" className={styles.menu__link}>
                Войти
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className={cn(styles.main__centerblock, styles.centerblock)}>
        <div className={cn(styles.centerblock__search, styles.search)}>
          <svg className={styles.search__svg}>
            <use xlinkHref="img/icon/sprite.svg#icon-search" />
          </svg>
          <input
            className={styles.search__text}
            type="search"
            placeholder="Поиск"
            name="search"
          />
        </div>
        <h2 className={styles.centerblock__h2}>Треки</h2>
        
        
        <div className={cn(styles.centerblock__filter, styles.filter)}>
          <div className={styles.filter__title}>Искать по:</div>
          <FilterItem filterItem={playlistFilterAlbum} caption="исполнителю" multiple/>
          <FilterItem filterItem={playlistFilterYear} caption="году выпуска" multiple/>
          <FilterItem filterItem={playlistFilterGenre} caption="жанру" multiple/>
        </div>
        
        <div className={cn(styles.centerblock__content, styles.content__playlist)}>
          <div className={styles.content__title}>
            <div className={cn(styles.playlistTitle__col, styles.col01)}>Трек</div>
            <div className={cn(styles.playlistTitle__col, styles.col02)}>Исполнитель</div>
            <div className={cn(styles.playlistTitle__col, styles.col03)}>Альбом</div>
            <div className={cn(styles.playlistTitle__col, styles.col04)}>
              <svg className={styles.playlistTitle__svg}>
                <use xlinkHref="img/icon/sprite.svg#icon-watch" />
              </svg>
            </div>
          </div>
          <div className={cn(styles.content__playlist, styles.playlist)}>

            {filteredTracks.map(t => <PlaylistItem key={t.id} track={t}/>)}
          </div>
        </div>
      </div>
      <div className={cn(styles.main__sidebar, styles.sidebar)}>
        <div className={styles.sidebar__personal}>
          <p className={styles.sidebar__personalName}>Sergey.Ivanov</p>
          <div className={styles.sidebar__icon}>
            <svg>
              <use xlinkHref="img/icon/sprite.svg#logout" />
            </svg>
          </div>
        </div>
        <div className={styles.sidebar__block}>
          <div className={styles.sidebar__list}>
            <div className={styles.sidebar__item}>
              <Link className={styles.sidebar__link} href="/">
                <Image
                  className={styles.sidebar__img}
                  src="/img/playlist01.png"
                  alt="day's playlist"
                  width={250} height={150}
                />
              </Link>
            </div>
            <div className={styles.sidebar__item}>
              <Link className={styles.sidebar__link} href="/">
                <Image
                  className={styles.sidebar__img}
                  src="/img/playlist02.png"
                  alt="day's playlist"
                  width={250} height={150}
                />
              </Link>
            </div>
            <div className={styles.sidebar__item}>
              <Link className={styles.sidebar__link} href="/">
                <Image
                  className={styles.sidebar__img}
                  src="/img/playlist03.png"
                  alt="day's playlist"
                  width={250} height={150}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
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
    <footer className="footer" />
  </div>
</div>

  );
}
