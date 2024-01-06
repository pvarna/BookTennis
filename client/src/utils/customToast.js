import { toast } from "react-toastify"

export const errorToast = (message) => {
    toast.error(message,  { position: toast.POSITION.TOP_CENTER})
}

export const infoToast = (message) => {
    toast.info(message, { position: toast.POSITION.TOP_CENTER})
}

export const warningToast = (message) => {
    toast.warn(message, { position: toast.POSITION.TOP_CENTER})
}