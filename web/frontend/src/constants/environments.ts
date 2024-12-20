export const Env = Object.freeze({
    apiUrl: import.meta.env.VITE_API_URL ?? '',
    apiPrefix: import.meta.env.VITE_API_PREFIX ?? '',
    bucketUrl: import.meta.env.VITE_BUCKET_URL ?? '',
    authToken: import.meta.env.VITE_AUTH_TOKEN ?? '',
    directory: import.meta.env.VITE_DIRECTORY ?? '',
})
