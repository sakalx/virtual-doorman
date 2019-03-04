export default function(string) {
  if (typeof string !== 'string') return false;

  return string.replace(/_/g , '')
}