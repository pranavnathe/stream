export const formatViewCount = (count) => {
    if (count < 1000) {
        return count; // Return the count as is if it's less than 1000
    } else if (count < 1000000) {
        // Convert to thousands (k) format if count is less than 1 million
        return Math.floor(count / 1000) + 'k';
    } else if (count < 1000000000) {
        // Convert to millions (M) format if count is less than 1 billion
        return Math.floor(count / 1000000) + 'M';
    } else {
        // Convert to billions (B) format for counts greater than or equal to 1 billion
        return Math.floor(count / 1000000000) + 'B';
    }
}