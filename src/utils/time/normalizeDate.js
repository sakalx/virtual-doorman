export default function(time) {
  if (time === null) return 'pending';

  const date = new Date(+time);
  const normalizedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  return normalizedDate
}