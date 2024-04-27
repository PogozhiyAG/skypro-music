import { Dispatch, SetStateAction, useEffect, useState } from "react";

export interface FilterItemOptions<T, F> {
    dataSet: T[],    
    valueFunction: (item: T) => F,
    formatFunction?: (value: F) => string,
    sortFunction?: (a: FilterItemValue<F>, b: FilterItemValue<F>) => number
    multiple?: boolean
}

export type FilterItemValue<F> = {
    value: F,
    caption: string,
    checked: boolean
}


export interface FilterItemHookResult<T, F extends string | number > {
    options: FilterItemOptions<T, F>,
    values: FilterItemValue<F>[], 
    isOpen: boolean,    
    setIsOpen: Dispatch<SetStateAction<boolean>>   
    updateValues:  () => void,
    isFit: (item: T) => boolean,
    handleItemClick: (item: FilterItemValue<F>) => void
}


export type FilterItemHook<T, F extends string | number > = (options: FilterItemOptions<T, F>) => FilterItemHookResult<T, F>;

export const useFilterItem = <T, F extends string | number >(options: FilterItemOptions<T, F>): FilterItemHookResult<T, F> => {
    const [values, setValues] = useState<FilterItemValue<F>[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const updateValues = () => setValues([...values]);

    const formatValue = (value: F) => (options.formatFunction && options.formatFunction(value)) ?? `${value}`;

    useEffect(() => {
        const result = options.dataSet
            .map(item => options.valueFunction(item))
            .filter((value, index, self) => self.indexOf(value) === index)
            .map(value => ({
                value: value,
                caption: formatValue(value),
                checked: false
            } as FilterItemValue<F>));

        if(options.sortFunction) {
            result.sort(options.sortFunction)
        }

        setValues(result);
    }, [options.dataSet]);

    const isFit = (item: T) => {
        const checkedValues = values.filter(v => v.checked);
        if(checkedValues.length === 0){
            return true;
        }

        const itemValue = options.valueFunction(item);

        for (let i = 0; i < checkedValues.length; i++) {
            if(itemValue === checkedValues[i].value){
                return true;
            }
        }

        return false;
    }

    const handleItemClick = (item: FilterItemValue<F>) => {
        item.checked = !item.checked;
        if(!options.multiple){
            values
                .filter(i => i !== item)
                .forEach(i => i.checked = false);
        }
        updateValues();
    }

    return {
        options,
        values,
        isOpen,         
        setIsOpen,
        updateValues,
        isFit,
        handleItemClick
    };
}