'use client'
import { useState } from 'react'
import {useParams} from 'next/navigation'
import Axios from 'axios'

import DatePicker, {registerLocale} from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './weather.scss'
import { Line } from "react-chartjs-2"
import { Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, } from "chart.js"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

import ja from 'date-fns/locale/ja'
import '@total-typescript/ts-reset'

registerLocale('ja', ja)

function getParams() {
    let params = useParams()
    return params
}

const Home = () => {
    const pathParams = getParams()
    const [weathers, setWeathers] = useState([])
    const [weatherCount, setWeatherCount] = useState(0)
    // let weatherCount = 0

    // today
    const today = new Date()
    const lastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
    const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)

    let prefectureId = 44
    let station = '東京'

    let pathDateStart = pathParams.start
    let pathDateEnd = pathParams.end

    // データ受信ステータス
    const [weatherDataReceiving, setWeatherDataReceiving] = useState(false)

    // 開始日の初期値
    const dateStartDefault = new Date(pathDateStart?.substr(0, 4),
        pathDateStart?.substr(4, 2) - 1,
        pathDateStart?.substr(6, 2))
    // 終了日の初期値
    const dateEndDefault = new Date(pathDateEnd?.substr(0, 4),
        pathDateEnd?.substr(4, 2) - 1,
        pathDateEnd?.substr(6, 2))

    const [dateStart, setDateStart] = useState(dateStartDefault)
    const [dateEnd, setDateEnd] = useState(dateEndDefault)

    const getWeathers = () => {
        setWeatherDataReceiving(true)

        const dateStartYMD = dateStart.getFullYear()
            + ('0' + String(dateStart.getMonth() + 1)).slice(-2)
            + ('0' + dateStart.getDate()).slice(-2)
        const dateEndYMD = dateEnd.getFullYear()
            + ('0' + String(dateEnd.getMonth() + 1)).slice(-2)
            + ('0' + dateEnd.getDate()).slice(-2)

        const baseUrl = "http://localhost:10101/api/weather/get?"
        const url = baseUrl + 'prefectureId=' + prefectureId
            + '&station=' + station
            + '&startDate=' + dateStartYMD
            + '&endDate=' + dateEndYMD
        Axios.get(url)
            .then((response) => {
                console.log('success')
                const json = response.data
                setWeathers(json.data)
                setWeatherCount(json.count)
                drawGraph()

            })
            .catch((error) => {
                console.log('error')
            })
            .finally(() => {
                setWeatherDataReceiving(false)
            })
    }

    // 開始日の都市変更
    const lastYearStart = () => {
        setDateStart(new Date(dateStart.getFullYear() - 1, dateStart.getMonth(), dateStart.getDate()))
    }
    const nextYearStart = () => {
        setDateStart(new Date(dateStart.getFullYear() + 1, dateStart.getMonth(), dateStart.getDate()))
    }
    const lastYearEnd = () => {
        setDateEnd(new Date(dateEnd.getFullYear() - 1, dateEnd.getMonth(), dateEnd.getDate()))
    }
    const nextYearEnd = () => {
        setDateEnd(new Date(dateEnd.getFullYear() + 1, dateEnd.getMonth(), dateEnd.getDate()))
    }

    const drawGraph = () => {
        const labels = weathers.map((weather) => {
            return weather.date
        })

        // 差一項気温一覧
        const temperatuure_highests = weathers.map((weather) => {
            return weather.temperature_highest
        })
        const temperature_lowests = weathers.map((weather) => {
            return weather.temperature_lowest
        })

        const data = {
            labels,
            datasets: [
                {
                    label: '最高気温',
                    data: temperatuure_highests,
                    borderColor: 'rgb(255, 99, 132)',
                },
                {
                    label: '最低気温',
                    data: temperature_lowests,
                    borderColor: 'rgb(100, 200, 200)',
                }
            ]
        }

        const Scale = {
            y: {
                min: -20,
                max: 60,
                title: {
                    display: true,
                    text: '気温（°C）',
                    color: '#ff4500',
                    rotate: 'vertical',
                    font: {
                        size: 20,
                    }
                }
            },
            x: {
                title: {
                    display: true,
                    text: '日時',
                    color: 'rgb(255, 70, 0)',
                    font: {
                        size: 20,
                    }
                }
            }
        }

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: "top" as const,
                },
                title: {
                    display: true,
                    text: '最高気温',
                },
            },
            scale: Scale
        }

        return (
            <Line options={options} data={data}/>
        )
    }

    return (

        <div>
            <div className="flex justify-center gap-10">
                <div>日付範囲</div>
                <div className="date-picker">
                    <DatePicker
                        endDate={lastYear}
                        dateFormat="yyyy-MM-dd"
                        locale="ja"
                        onChange={selectedDate => setDateStart(selectedDate || lastYear)}
                        selected={(dateStart)}
                    >
                    </DatePicker>
                    <button onClick={() => lastYearStart()} className="year">
                        前年
                    </button>
                    <button onClick={() => nextYearStart()} className="year">
                        翌年
                    </button>
                </div>
                <div className="date-picker">
                    <DatePicker
                        endDate={yesterday}
                        dateFormat="yyyy-MM-dd"
                        locale="ja"
                        onChange={selectedDate => setDateEnd(selectedDate || yesterday)}
                        selected={(dateEnd)}
                    >
                    </DatePicker>

                    <button onClick={() => lastYearEnd()} className="year">
                        前年
                    </button>
                    <button onClick={() => nextYearEnd()} className="year">
                        翌年
                    </button>
                </div>
                <div>
                    <button
                        className="get-weather {weatherDataReceiving && 'receiving'}"
                        onClick={getWeathers}
                        disabled={weatherDataReceiving}
                    >
                        {weatherDataReceiving
                            ? "取得中"
                            : "取得"
                        }
                    </button>
                </div>
            </div>
            <div className="flex justify-center gap-10">
                <div>
                    取得件数： {weatherCount}
                </div>
            </div>
            <div id="graph">
                {drawGraph()}
            </div>

            <div className="flex justify-center">
                {weathers?.length > 0 && (
                    <table className="weather-table">
                        <thead>
                        <tr>
                            <th></th>
                            <th>日付</th>
                            <th>最高気温</th>
                            <th>最低気温</th>
                        </tr>
                        </thead>
                        <tbody>
                        {weathers?.map((weather: any, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{weather.date}</td>
                                    <td>{weather.temperature_highest}</td>
                                    <td>{weather.temperature_lowest}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default Home
