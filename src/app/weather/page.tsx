'use client'
import React from 'react'
import Link from 'next/link'

const Start = () => {
    const now = new Date()
    const year = now.getFullYear() - 1
    const month = ("0" + String(now.getMonth() + 1).slice(-2))
    const day = now.getDate()

    return String(year) + month + String(day)
}
const End = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = ("0" + String(now.getMonth() + 1).slice(-2))
    const day = now.getDate() - 1

    return String(year) + month + String(day)
}

type State = {
    count: number
}

export default class Page extends React.Component<NonNullable<unknown>, State> {
    constructor(props: NonNullable<unknown> | Readonly<NonNullable<unknown> | Readonly<State>>) {
        super(props)
        this.state = {
            count: 0
        }
    }
    render () {
        return (
            <main className="flex min-h-screen flex-col item-center justify-between p-24">
                <h1>気象情報</h1>

                <div>start = {Start()}</div>
                <div>
                    <Link href={'weather/date/' + Start() + '/' + End()}>
                        日付範囲指定 / {Start()} / {End()}
                    </Link>
                </div>
                <div className="z-10 max-w-5xl w-full items-center">

                </div>
            </main>
        )
    }
}
