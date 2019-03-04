export default function(time) {
  if (typeof time !== 'number') return 'pending';

  const date = new Date(time);
  const normalizedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  return normalizedDate
}