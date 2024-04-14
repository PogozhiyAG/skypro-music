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
import { NavBar } from "@/components/NavBar/NavBar";
import { SideBar } from "@/components/SideBar/SideBar";
import { Player } from "@/components/Player/Player";



enum DateSortType{
  Default = 'По умолчанию',
  NewFirst = 'Сначала новые',
  OldFirst = 'Сначала старые'
}

const releaseDateSortOptions: DateSortType[] = [
  DateSortType.Default,
  DateSortType.NewFirst,
  DateSortType.OldFirst
];


export default function Home() {
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const {tracks, loadTracks} = useContext(DataContext);
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [searchText, setSearchText] = useState<string>('');
  
  const playlistFilterAlbum = useFilterItem<TrackInfo, string>({
    dataSet: tracks,
    valueFunction: track => track.author,
    sortFunction: (a, b) => a.value.localeCompare(b.value)
  });

  const playlistReleaseDateSort = useFilterItem<DateSortType, DateSortType>({
    dataSet: releaseDateSortOptions,
    valueFunction: option => option,        
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


  const isSearchTextComplaint = (track: TrackInfo) => {
    if(!searchText) {
      return true;
    }

    const searchTextNorm = searchText.toLowerCase();

    return  (
         track.name.toLowerCase().indexOf(searchTextNorm) >= 0
      || track.author.toLowerCase().indexOf(searchTextNorm) >= 0
      || track.album.toLowerCase().indexOf(searchTextNorm) >= 0
    );
  }

  useEffect(() => {
    const filtered = tracks.filter(t => 
         playlistFilterAlbum.isFit(t)      
      && playlistFilterGenre.isFit(t)
      && isSearchTextComplaint(t)
    );

    const sortType = playlistReleaseDateSort.values.find(v => v.checked);
    switch (sortType?.value) {
      case DateSortType.NewFirst: filtered.sort((a: TrackInfo, b: TrackInfo) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime()); break;
      case DateSortType.OldFirst: filtered.sort((a: TrackInfo, b: TrackInfo) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()); break;
    }

    setFilteredTracks(filtered);
  }, 
  [
    playlistFilterAlbum.values, 
    playlistReleaseDateSort.values, 
    playlistFilterGenre.values, 
    searchText,
    tracks
  ]);


  return (
    <div className={styles.wrapper}>
  <div className={styles.container}>
    <main className={styles.main}>
      <NavBar/>
      
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
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        </div>
        <h2 className={styles.centerblock__h2}>Треки</h2>
        
        
        <div className={cn(styles.centerblock__filter, styles.filter)}>
          <div className={styles.filter__title}>Искать по:</div>
          <FilterItem filterItem={playlistFilterAlbum} caption="исполнителю" multiple/>
          <FilterItem filterItem={playlistReleaseDateSort} caption="году выпуска" />
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

      <SideBar/>
    </main>

    <Player/>
  </div>
</div>

  );
}
