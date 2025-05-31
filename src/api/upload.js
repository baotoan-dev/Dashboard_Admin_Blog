import axios from 'axios';

export async function uploadFile(file) {
  const URL = `${process.env.REACT_APP_API_URL_UPLOAD}/api/files`;

  const formData = new FormData();

  formData.append('file', file);

  // Thay URL này bằng endpoint upload thực tế của bạn
  const res = await axios.post(URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  console.log('Upload response:', res.data);
  return res.data.url; // Trả về URL ảnh
}
