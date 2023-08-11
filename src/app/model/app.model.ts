export interface IActionResponse<T = any>
{
    isSuccessful: boolean;
    payload: T;
}
