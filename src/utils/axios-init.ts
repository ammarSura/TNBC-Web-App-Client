import axios, { AxiosRequestConfig } from "axios";
import axiosRetry from "axios-retry";
import { useEffect } from "react";
import { useAuth } from "../contexts/Auth";

axios.defaults.baseURL = "http://localhost:3001";
const axiosInit = axiosRetry(axios, {
    onRetry: async (error, config) => {
        console.log(error, config);
    },
    retryCondition: (error) => {
        const status = error?.response?.status;
        if (status) {
            return true;
        } else {
            return false;
        }
    }
});

export default axios;
// const refreshTokenExpired = async(refreshToken: string | null, refreshTokenExpiresAt: number | null) => {
//     if (refreshToken) {
//         if (refreshTokenExpiresAt && refreshTokenExpiresAt < Date.now()) {
//             return false
//         } else {
//             return true
//         }
//     }
// }

// const useAxios = () => {

//     // const { accessToken,
//     //     accessTokenExpiresAt,
//     //     loginWithRefreshToken,
//     //     refreshToken,
//     //     refreshTokenExpiresAt,
//     //     isAuthenticated
//     //  } = useAuth();
//     axios.defaults.baseURL = "http://localhost:3001"

//     axiosRetry(axios, {
//         retries: 2,
//         retryDelay: (retryCount) => {
//             return retryCount * 500
//         },
//         onRetry: async(_, error, requestConfig) => {
//             console.log(requestConfig)
//             // if(error?.response?.status === 401) {
//             //     const expired = await refreshTokenExpired(refreshToken, refreshTokenExpiresAt)
//             //     if(!expired) {
//             //         const newAccessToken = await loginWithRefreshToken(refreshToken!)
//             //         if(newAccessToken) {
//             //             requestConfig.headers!.Authorization = `Bearer ${newAccessToken}`
//             //         }
//             //     }
//             // }
//         },
//         retryCondition: (error) => {
//             const status = error?.response?.status
//             if(status && (status === 401 || status >= 500)) {
//                 return true
//             } else {
//                 return false
//             }
//         }
//     })

//     // axios.interceptors.request.use(async(config: AxiosRequestConfig<any>) => {
//     //     console.log(config, 'asd', localStorage.getItem('accessToken'), isAuthenticated)
//     //     if (accessToken) {
//     //         if (accessTokenExpiresAt && accessTokenExpiresAt < Date.now()) {
//     //             config.headers!.Authorization = `Bearer ${accessToken}`
//     //         } else {
//     //             const expired = await refreshTokenExpired(refreshToken, refreshTokenExpiresAt)
//     //             if(!expired) {
//     //                 const newAccessToken = await loginWithRefreshToken(refreshToken!)
//     //                 if(newAccessToken) {
//     //                     config.headers!.Authorization = `Bearer ${newAccessToken}`
//     //                 }
//     //             }
//     //         }
//     //     }

//     //     return config
//     // })

//     // axios.interceptors.response.use((response) => {
//     //     return response
//     // }, async(error) => {
//     //     const { config } = error;
//     //     if(error?.response?.status !== 200) {
//     //         await refreshTokenCheck(refreshToken, refreshTokenExpiresAt)



//     //     }
//     // })

//     return axios
// }

// export default useAxios


