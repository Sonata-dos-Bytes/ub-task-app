export const ApiUrl = (params: string) => {
    const baseUrl = process.env.EXPO_PUBLIC_API_URL ?? "https://ub-task-api.gmvo90.easypanel.host"
    const url = `${baseUrl}${params}`

    return url
}