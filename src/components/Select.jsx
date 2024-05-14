import React, { useId } from 'react'

function Select({
    options,
    label,
    className = "",
    onChange, // Add onChange prop
    ...props
}, ref) {

    const id = useId()
    const handleChange = (event) => {
        const selectedValue = event.target.value;
        onChange(selectedValue); // Call the onChange callback with the selected value
    };
    
    return (
        <div className='w-full'>
            {label && <label
            className='inline-block mb-1 pl-1'
            htmlFor={id}>
                {label}
            </label>}
            <select
            {...props}
            id={id}
            ref={ref}
            onChange={handleChange} // Call handleChange on selection change
            className={`px-3 py-2 rounded-lg outline-none bg-white text-textBlack dark:bg-grey2 dark:text-white duration-200 border border-backgroundDark w-full ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)