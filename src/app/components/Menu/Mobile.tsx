import NavItems from "./NavItems"

interface IMobileProps {
    isOpen: boolean
}

const Mobile = ({ isOpen }: IMobileProps): React.JSX.Element => {
    return (
        <ul
            className={`
                md:hidden w-1/2 bg-blue-deep h-screen z-10
                fixed top-0 transition-all duration-1000
                flex flex-col justify-center items-center
                ease-in-out trasnform ${isOpen ? "translate-x-0 opacity-1" : "translate-x-full opacity-0"}
                `}
        >
            <NavItems href="/">Home</NavItems>
            <NavItems href="">Projetos</NavItems>
            <NavItems href="">Sobre Mim</NavItems>
            <NavItems href="">Contato</NavItems>
        </ul>
    )
}

export default Mobile