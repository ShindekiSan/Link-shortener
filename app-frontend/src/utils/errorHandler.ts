import axios from 'axios';

export default function handleError(e: unknown) {
  if (axios.isAxiosError(e)) {
    return `Error: ${e.response?.data.message}`;
  }
  return String(e);
}
