export const timeAgo = (createdAt) => {
    const now = new Date();
    const createdAtDate = new Date(createdAt);
    const diffMilliseconds = now - createdAtDate;
    const diffSeconds = Math.floor(diffMilliseconds / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
        return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    } else if (diffHours > 0) {
        return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffMinutes > 0) {
        return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
        return `${diffSeconds} ${diffSeconds === 1 ? 'second' : 'seconds'} ago`;
    }
}