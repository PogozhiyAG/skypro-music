import { ChangeEventHandler } from "react";
import styles from "./ProgressBar.module.css";
import { formatDuration } from "@/utils";

export type ProgressBarProps = {
    max: number, 
    value: number, 
    step: number, 
    onChange: ChangeEventHandler<HTMLInputElement>
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ max, value, step, onChange }) => {
    const currentTimeFormat = formatDuration(value);
    const totalTimeFormat = formatDuration(max);

    return (
        <div className={styles.wrapper}>
            <div className={styles.info_panel}>
                {currentTimeFormat} / {totalTimeFormat}
            </div>
            <input
                className={styles.styledProgressInput} // Применение стилей к ползунку
                type="range" // Тип элемента - ползунок
                min="0" // Минимальное значение ползунка
                max={max} // Максимальное значение, зависит от длительности аудио
                value={value} // Текущее значение ползунка
                step={step} // Шаг изменения значения
                onChange={onChange} // Обработчик события изменения
            />
        </div>
    );
}