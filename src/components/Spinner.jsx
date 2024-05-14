import React from 'react'

export const Spinner = ({ fullScreen }) => {
    return (
        <div className={`fixed z-40 top-0 left-0 w-full h-full flex items-center justify-center ${fullScreen && fullScreen ? "bg-white dark:bg-backgroundDark" : 'bg-grey2 bg-opacity-50'}`}>
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-grey1 dark:border-white"></div>
        </div>
    );
}