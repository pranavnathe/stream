
export const parseErrorMessage = (htmlString) => {
    const regex = /<pre>Error: (.*?)<br>/s;
    const match = regex.exec(htmlString);
    if (!match) console.error(htmlString);
    return match ? match[1] : "Error: Unable to complete request";
}