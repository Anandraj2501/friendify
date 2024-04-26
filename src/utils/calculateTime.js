const calculateTime = (postTime) =>{
    const currentTime = Date.now(); // Current time in milliseconds
    const elapsedMilliseconds = currentTime - postTime;

    // Convert milliseconds to seconds
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

    if (elapsedSeconds < 60) {
        return `${elapsedSeconds} second${elapsedSeconds !== 1 ? 's' : ''} ago`;
    } else if (elapsedSeconds < 3600) {
        const minutes = Math.floor(elapsedSeconds / 60);
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (elapsedSeconds < 86400) {
        const hours = Math.floor(elapsedSeconds / 3600);
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
        const days = Math.floor(elapsedSeconds / 86400);
        return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
}
export default calculateTime;