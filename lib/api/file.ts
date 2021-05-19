import axios from '.';

/**
 * 파일 업로드 API
 * @param file 업로드 할 파일
 */
export const uploadFileAPI = (file: FormData) => axios.post('/api/files/upload', file);
