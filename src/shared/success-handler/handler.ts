export const apiSuccessHandler = (value: any) => {
    return {
        status: "SUCCESS",
        value: value,
        code: 200
    }
}