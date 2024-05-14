
export const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    // Return the formatted duration
    return `${minutes}:${seconds}`;
}