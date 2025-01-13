interface IBodyProps {
    children: React.ReactNode
}

const Body = ({ children }: IBodyProps): React.JSX.Element => {
    return (
        <main className="w-full min-h-[90vh] bg-black">
            <div className="flex flex-col items-start w-full md:max-w-7xl mx-auto p-5  ">
                {children}
            </div>
        </main>
    )
}

export default Body;
