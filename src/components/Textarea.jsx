import React, { useId } from 'react'

const Textarea = React.forwardRef( function Input({
    label,
    type = "text",
    classname = "",
    maxTextLength,
    ...props
}, ref){
    const id = useId()

    return (
        <div className='w-full'>
            {label && <label
            className='inline-block mb-1 pl-1'
            htmlFor={id}>
                {label}
            </label>}
            <textarea
            maxLength={maxTextLength ? maxTextLength : undefined}
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-textBlack outline-none focus: border border-backgroundDark w-full dark:outline-1 dark:outline-white dark:text-white dark:textwh dark:bg-grey2 ${classname}`}
            ref={ref}
            {...props}
            id={id}
            />
            {maxTextLength && 
            <div className='text-gray-400'>
            Characters remaining: {maxTextLength - (props.value ? props.value.length : 0)}
            </div>}
        </div>
    )
})

export default Textarea