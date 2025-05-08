export const ApiUrl = (params: string) => {
    const url = `${process.env.EXPO_PUBLIC_API_URL}${params}`

    return url
}