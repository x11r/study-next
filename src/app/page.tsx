'use client'
import React from 'react'
import Link from 'next/link'

// import { useRouter } from 'next/router'
import { useParams } from 'next/navigation'

// export default function Home() {
//
//     // const router = useRouter()
//     // console.log('==== router ====')
//     // console.log(router)
//
//     const params = useParams()
//     console.log('==== params ====')
//     console.log(params)
//
//     return (
//         <main className="flex min-h-screen flex-col item-center justify-between p-24">
//             <div className="z-10 max-w-5xl w-full items-center">
//
//                 <ul>
//                     <li>
//                         <Link href="/rakuten">
//                             楽天API関連
//                         </Link>
//                     </li>
//                     <li>
//                         <Link href="/weather">
//                              気象情報
//                         </Link>
//                     </li>
//                 </ul>
//             </div>
//         </main>
//     )
// }


export default class Home extends React.Component<NonNullable<unknown>> {
    constructor(props: NonNullable<unknown> | Readonly<NonNullable<unknown>>) {
        super(props)
        this.props = {}
    }

    render () {
        return (
            <main className="flex min-h-screen flex-col item-center justify-between p-24">
                <div className="z-10 max-w-5xl w-full items-center">
                    <ul>
                        <li>
                            <Link href="/rakuten">
                                楽天API関連
                            </Link>
                        </li>
                        <li>
                            <Link href="/weather">
                                 気象情報
                            </Link>
                        </li>
                    </ul>
                </div>
            </main>
        )
    }
}
