import { twMerge } from "tailwind-merge"

export const Button = ({children, size = "medium", className, isActive, ...props}) => {
    const sizeClassNames = {
        small: "text-xs px-2 py-1",
        medium: "text-sm px-5 py-3",
        large: "text-base px-8 py-4",
    }
    
    return (
        <button className={twMerge(
            "border border-grey2 dark:border-white dark:bg-backgroundContrast dark:text-white bg-white text-textBlack rounded-full hover:dark:bg-grey1 hover:dark:border-loginBlue", 
            sizeClassNames[size],
            className,
            isActive && "dark:bg-white dark:text-black"
            )}
            {...props}
        >
            {children}
        </button>
    )
}