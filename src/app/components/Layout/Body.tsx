interface IBodyProps {
    children: React.ReactNode
}

const Body = ({ children }: IBodyProps): React.JSX.Element => {
    return (
        <main className="flex flex-col items-center  min-h-screen w-full max-w-7xl mx-auto p-5">
            {children}
        </main>
    )
}

export default Body