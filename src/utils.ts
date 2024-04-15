export const formatDuration = (durationInSeconds: number): string => {
    const minutes: number = Math.floor(durationInSeconds / 60);
    const seconds: number = Math.floor(durationInSeconds % 60);
    return minutes.toString() + ':' + seconds.toString().padStart(2, '0')
}