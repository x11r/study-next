import Link from 'next/link'

export default function Home() {

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
