import React, { useState } from 'react'

export const Description = ({ text, maxWords }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const truncateText = (text, limit) => {
        const words = text.split(' ');
        if (words.length > limit) {
            return words.slice(0, limit).join(' ') + '...';
        }
        return text;
    }
    
    return (
        <div className='dark:text-white text-base'>
        <p className="whitespace-pre-wrap">
            {isExpanded ? text : truncateText(text, maxWords)}
        </p>
        {text.split(' ').length > maxWords && (
            <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-loginBlue hover:underline focus:outline-none"
            >
            {isExpanded ? 'Read less' : 'Read more'}
            </button>
        )}
        </div>
    );
}