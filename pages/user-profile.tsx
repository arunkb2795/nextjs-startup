import { GetServerSideProps } from "next"

export default function UserProfile(props: any) {
    console.log({ props })
    return (
        <div>{props.userName}</div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    console.log("Server side code")
    return {
        props: {
            userName: 'Arun',
        }
    }
}
