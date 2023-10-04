import { AxiosError } from 'axios';

export const getAxiosError = (error: unknown) => {
  let message;

  if (error instanceof AxiosError) {
    message = error.response?.data.msg || error.response?.data.error_description;
  } else {
    message = String(error);
  }
  return message;
};
