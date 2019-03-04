export default function(millisec) {
  if (typeof millisec !== 'number') return 0;

  const minutes = Math.floor(millisec / 60000);
  const seconds = ((millisec % 60000) / 1000).toFixed(0);
  const convertedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return millisec > 0 ? convertedTime : '0:00'
}