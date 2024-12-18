import Header from "./Header";

const Page = ({children}:{children: React.ReactNode}) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default Page;