export const generateRandomTitle = () => {
    const timestamp = Date.now() // Get current timestamp
    const randomStr = Math.random().toString(36).substring(2, 8) // Generate a random string
    return `file_${timestamp}_${randomStr}` // Combine timestamp and random string for the title
}
