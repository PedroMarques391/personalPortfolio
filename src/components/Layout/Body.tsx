interface IBodyProps {
    children: React.ReactNode
}

const Body = ({ children }: IBodyProps): React.JSX.Element => {
    return (
        <main className="w-full bg-blue-darker">
            <div className="flex flex-col items-start min-h-screen w-full max-w-7xl mx-auto p-5">{children}</div>
        </main>
    )
}

export default Body