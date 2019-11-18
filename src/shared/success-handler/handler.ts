export const apiSuccessHandler = (value: string) => {
    return {
        status: "SUCCESS",
        value: value,
        code: 200
    }
}