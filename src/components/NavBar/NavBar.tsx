"use client"
import Link from "next/link";
import Image from "next/image";
import styles from "./NavBar.module.css";
import cn from 'classnames'
import { useState } from "react";

export const NavBar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const toggleIsOpen = () => setIsOpen(!isOpen);

    return (
        <nav className={cn(styles.main__nav, styles.nav)}>
            <div className={cn(styles.nav__logo, styles.logo)}>
                <Image className={styles.logo__image} src="/img/logo.png" alt="" width={114} height={17}/>
            </div>
            <div className={cn(styles.nav__burger, styles.burger)} onClick={toggleIsOpen}>
                <span className={styles.burger__line} />
                <span className={styles.burger__line} />
                <span className={styles.burger__line} />
            </div>
            {
                isOpen && 
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
            }
        </nav>
    );
}