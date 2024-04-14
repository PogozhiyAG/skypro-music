import React, { useEffect, useRef, useState } from "react";
import styles from "./FilterItem.module.css";
import { FilterItemHookResult } from "@/hooks/useFilterItem";

export type FilterItemProps<T, F> = {
    filterItem: FilterItemHookResult<T, F>
    caption: string,
    multiple?: boolean
}

export const FilterItem = <T, F, >({filterItem, caption, multiple}: FilterItemProps<T, F>) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const selectRef = useRef(null);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const options = event.target.options;
       
        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            const item = filterItem.values[i];
            item.checked = option.selected;
        }

        filterItem.updateValues();
    };

    const handleCaptionClick = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        if(isOpen){
            selectRef.current?.focus();
        }
    }, [isOpen])

    const handleSelectBlur = () => {
        setIsOpen(false);
    }


    return (
        <div>
            <div className={styles.filter__caption} onClick={handleCaptionClick}>{caption}</div>
            {
                isOpen &&
                <div className={styles.dropdown_container}>
                    <div className={styles.select_container}>
                        <select ref={selectRef} className={styles.select} multiple={multiple} onChange={handleSelectChange} onBlur={handleSelectBlur}>            
                            {filterItem.values.map(v => <option key={v.value} value={v.value} selected={v.checked}>{v.caption}</option>)}                
                        </select>
                    </div>
                </div>
            }
        </div>
    );
}


