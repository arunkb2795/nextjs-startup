import Link from "next/link"
import { PropsWithChildren } from "react"

type ButtonProps = {
    link: string,
}

export default function Button({ link, children }: PropsWithChildren<ButtonProps>) {
    return (
        <Link href={link}>{children}</Link>
    )
}
