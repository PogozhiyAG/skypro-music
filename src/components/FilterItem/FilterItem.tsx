"use client"
import React, { useEffect, useRef, useState } from "react";
import styles from "./FilterItem.module.css";
import { FilterItemHookResult, FilterItemValue } from "@/hooks/useFilterItem";
import cn from "classnames"

export type FilterItemProps<T, F extends string | number > = {
    filterItem: FilterItemHookResult<T, F>
    caption: string,    
    captionClick?: () => void
}

export const FilterItem = <T, F extends string | number >(options: FilterItemProps<T, F>) => {
    
    const handleItemClick = (item: FilterItemValue<F>) => {
        options.filterItem.handleItemClick(item);
    }

    const handleCaptionClick = () => {
        options.captionClick && options.captionClick();
        options.filterItem.setIsOpen(!options.filterItem.isOpen);
    }
    
    const hasSelection =  options.filterItem.values.filter(v => v.checked).length > 0;
    const filterCaptionClasses = cn(styles.filter__caption, hasSelection ? styles.filter__caption_active : '');

    return (
        <div>
            <div className={filterCaptionClasses} onClick={handleCaptionClick}>{options.caption}</div>
            {
                options.filterItem.isOpen &&
                <div className={styles.dropdown_container}>
                    <div className={styles.list_container}>
                        <div className={styles.scroll_container}>
                            <ul className={styles.list}>
                                {
                                    options.filterItem.values.map(v => {
                                        const classes = cn(styles.list_item, {[styles.list_item_active]: v.checked})

                                        return (
                                            <li 
                                                key={v.value} 
                                                value={v.value} 
                                                className={classes} 
                                                onClick={() => handleItemClick(v)}>{v.caption}
                                            </li>
                                        )
                                    })
                                } 
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}


