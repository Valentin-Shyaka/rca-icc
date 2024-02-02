import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getFile = (fileName: string | null | undefined) =>
  fileName ? `http://194.163.167.131:6543/api/v1/files/${fileName}` : null;
