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
    
    const selectionCount =  options.filterItem.values.filter(v => v.checked).length;
    const filterCaptionClasses = cn(styles.filter__caption, selectionCount > 0 ? styles.filter__caption_active : '');

    return (
        <div>
            <div className={styles.filter__caption_container} onClick={handleCaptionClick}>
                <div className={filterCaptionClasses}>{options.caption}</div>
                {
                        options.filterItem.options.multiple 
                    &&  selectionCount > 0
                    &&  <div className={styles.filter__caption_count}>{selectionCount}</div>
                }
            </div>
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


