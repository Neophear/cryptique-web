import { getRequest, postRequest } from "@/helpers/http";

const API_URL = "https://api.cryptique.dev";

// Health check
export const healthCheck = () => {
    return getRequest({ endpoint: `${API_URL}/health`, skipAuth: true, multipart: false });
};

// Add message
export const addMessage = (message: string, maxAttempts: number, maxDecrypts: number) => {
    const payload = {
        message,
        maxAttempts,
        maxDecrypts,
    };
    return postRequest({ endpoint: `${API_URL}/message`, payload, skipAuth: false, multipart: false });
};

// Add message file
export const addMessageFile = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return postRequest({ endpoint: `${API_URL}/message/upload`, payload: formData, skipAuth: false, multipart: true });
};

// Decrypt message
export const decryptMessage = (id: string, key: string) => {
    const payload = { key };

    return postRequest({ endpoint: `${API_URL}/message/${id}/decrypt`, payload, skipAuth: false, multipart: false });
};
