"use client"
import Link from "next/link";
import Image from "next/image";
import styles from "./SideBar.module.css";
import cn from 'classnames'

export const SideBar = () => {
    return (
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
    );
}