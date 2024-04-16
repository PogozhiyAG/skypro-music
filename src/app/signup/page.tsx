"use client"
import Image from "next/image";
import styles from "./page.module.css";
import cn from "classnames"
import Link from "next/link";
import { ModalInput } from "@/components/ModalInput/ModalInput";
import { useState } from "react";
import { ButtonStyle, StyledButton } from "@/components/StyledButton/StyledButton";

export default function SignUp() {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [repeatPassword, setRepeatPassword] = useState<string>();

    return(
        <div className={styles.wrapper}>
            <div className={styles.containerSignup}>
                <div className={styles.modal__block}>
                <form className={styles.modal__formLogin}>
                    <Link href="../">
                        <div className={styles.modal__logo}>
                            <Image src="/img/logo_modal.png" alt="logo" width={140} height={21}/>
                        </div>
                    </Link>
                    <ModalInput placeholder="Почта" value={email} onChange={e => setEmail(e.target.value)}/>
                    <ModalInput type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)}/>
                    <ModalInput type="password" placeholder="Повторите пароль" value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)}/>
                    
                    <StyledButton buttonStyle={ButtonStyle.Primary} classes={styles.margin_top__big}>
                        <Link href="/">Зарегистрироваться</Link>
                    </StyledButton>
                </form>
                </div>
            </div>
        </div>
    );
}