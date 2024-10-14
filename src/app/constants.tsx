
import Axios from 'axios'
import { useState, useEffect } from 'react'

const apiBaseUrl = 'http://localhost:10101'

function getConstants () {
    const url = 'http::/localhost:10101/api/weather/constants'
    Axios.get(url)
        .then((response) => {
            console.log(response.data)
        })
}

const constantData = getConstants()


// const Constants = () => {
//     const [constants, getConstant] = useState([])
//
//     useEffect(() => {
//         getConstants()
//     }, [])
//
//     const getConstants = () => {
//         const url = apiBaseUrl + '/api/weather/constants'
//         console.log('======')
//         Axios.get(url)
//             .then((response) => {
//                 console.log(response.data)
//                 // getConstants(response.data)
//                 // getConstants(response.data?.prefectures)
//             })
//             .catch((error) => {
//                 console.log(error)
//             })
//     }
// }
// export default Constants

export const constants = {
    apiBaseUrl: 'http://localhost:8016',
    prefectures: [
        {
            id: 44,
            name: 'tokyo',
            name_jp: '東京',
            stations: [
                {
                    name: 'tokyo',
                    name_jp: '東京',
                },
                {
                    name: 'hachioji',
                    name_jp: '八王子',
                },
            ]
        }
        // {
        //     id: 82,
        //     name: 'fukuoka',
        //     name_jp: '福岡',
        //     stations: [
        //         {
        //             name: 'fukuoka',
        //             name_jp: '福岡',
        //         }
        //     ]
        // },
        // {
        //     id: 85,
        //     name: 'saga',
        //     name_jp: '佐賀',
        //     stations: [
        //         {
        //             name: 'saga',
        //             name_jp: '佐賀',
        //         },
        //         {
        //             name: 'karatsu',
        //             name_jp: '唐津',
        //         }
        //     ]
        // }
    ]
}
