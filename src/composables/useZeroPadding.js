export default function useZeroPadding(data) {
  if(data.toString().length === 1) {
    return "0" + data;
  }
  return data;
}
