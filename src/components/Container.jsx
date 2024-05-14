import { twMerge } from "tailwind-merge"

export const Container = ({children, className}) => {
    return <div className={twMerge("mx-auto max-w-[1280px] px-6", className)}>
                {children}
            </div>
}