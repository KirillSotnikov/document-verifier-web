import { Slide, toast } from 'react-toastify';

export const openSuccessNotification = (message: string) => {
  toast.success(message, {
    autoClose: 3000,
    closeOnClick: true,
    draggable: true,
    hideProgressBar: true,
    pauseOnHover: true,
    position: 'top-right',
    progress: undefined,
    theme: 'light',
    transition: Slide,
  });
};

export const openErrorNotification = (message: string) => {
  toast.error(message, {
    autoClose: 3000,
    closeOnClick: true,
    draggable: true,
    hideProgressBar: true,
    pauseOnHover: true,
    position: 'top-right',
    progress: undefined,
    theme: 'light',
    transition: Slide,
  });
};
