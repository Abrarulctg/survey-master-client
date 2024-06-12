import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: 'https://survey-app-server-hazel.vercel.app'
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
    })

    //Intercepts 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;

        if (status === 401 || status === 403) {
            await logOut();
            navigate('/login');
        }
        return Promise.reject(error)
    })

    return axiosSecure;
};

export default useAxiosSecure;



// import axios from 'axios';
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import useAuth from './useAuth';

// const axiosSecure = axios.create({
//     baseURL: 'https://survey-app-server-hazel.vercel.app'
// });

// const useAxiosSecure = () => {
//     const navigate = useNavigate();
//     const { logOut } = useAuth();

//     React.useEffect(() => {
//         const requestInterceptor = axiosSecure.interceptors.request.use(
//             (config) => {
//                 const token = localStorage.getItem('access-token');
//                 if (token) {
//                     config.headers.authorization = `Bearer ${token}`;
//                 }
//                 console.log("Request Interceptor - Config: ", config);
//                 return config;
//             },
//             (error) => Promise.reject(error)
//         );
//         const responseInterceptor = axiosSecure.interceptors.response.use(
//             (response) => response,
//             async (error) => {
//                 console.log("Response Interceptor - Errr: ", error.response);
//                 const status = error.response ? error.response.status : null;

//                 if (status === 401 || status === 403) {
//                     await logOut();
//                     navigate('/login');
//                 }
//                 return Promise.reject(error);
//             }
//         );
//         return () => {
//             axiosSecure.interceptors.request.eject(requestInterceptor);
//             axiosSecure.interceptors.response.eject(responseInterceptor);
//         };
//     }, [logOut, navigate]);

//     return axiosSecure;
// };

// export default useAxiosSecure;