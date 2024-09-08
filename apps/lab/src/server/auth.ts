import { handlers } from '@/auth'

export const { GET, POST } = handlers

// others

// export type AuthDTO = {
//   user: User;
//   accessToken: string;
// };

// // login
// export type LoginParams = {
//   identifier: string;
//   password: string;
// };
// export async function login(loginParams: LoginParams) {
//   const { data } = await axios.post<AuthDTO, AxiosResponse, any>('/auth/login', {
//     username: loginParams.identifier,
//     ...loginParams,
//   });
//   const { user, token } = data.data;
//   store.dispatch(setUser(user));
//   store.dispatch(setAccessToken(token));
// }

// // register
// export type RegisterParams = {
//   username: string;
//   email: string;
//   password: string;
// };

// export async function register(registerParams: RegisterParams) {
//   const { data } = await axios.post<AuthDTO, AxiosResponse, RegisterParams>('/auth/register', registerParams);
//   const { user, token } = data.data;
//   store.dispatch(setUser(user));
//   store.dispatch(setAccessToken(token));
// }

// // forgot password
// export type ForgotPasswordParams = {
//   email: string;
// };
// export const forgotPassword = async (forgotPasswordParams: ForgotPasswordParams) => {
//   await axios.post<void, AxiosResponse<void>, ForgotPasswordParams>('/auth/forgot-password', forgotPasswordParams);
//   toast.success('Please check your email for the password reset link.');
// };

// // reset password
// export type ResetPasswordParams = {
//   resetToken: string;
//   password: string;
// };
// export async function resetPassword(resetPasswordParams: ResetPasswordParams) {
//   await axios.post<void, AxiosResponse<void>, ResetPasswordParams>('/auth/reset-password', resetPasswordParams);

//   toast.success('Your password has been changed successfully, please login again.');
// }
