
import Image from "next/image";
import styles from "./page.module.css";
import cn from "classnames"
import Link from "next/link";

export default function SignUp() {
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
                    <input
                        className={cn(styles.modal__input, styles.login)}
                        type="text"
                        name="login"
                        placeholder="Почта"
                    />
                    <input
                        className={cn(styles.modal__input, styles.passwordFirst)}
                        type="password"
                        name="password"
                        placeholder="Пароль"
                    />
                    <input
                        className={cn(styles.modal__input, styles.passwordDouble)}
                        type="password"
                        name="password"
                        placeholder="Повторите пароль"
                    />
                    <button className={styles.modal__btnSignupEnt}>
                        <Link href="/">Зарегистрироваться</Link>
                    </button>
                </form>
                </div>
            </div>
        </div>
    );
}