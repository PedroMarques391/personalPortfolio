import React from 'react'
import NavItems from './NavItems'

const Desktop = (): React.JSX.Element => {
    return (
        <ul className="hidden md:flex justify-center items-center gap-x-3 ">
            <NavItems href="/">Home</NavItems>
            <NavItems href="">Projetos</NavItems>
            <NavItems href="">Sobre Mim</NavItems>
            <NavItems href="">Contato</NavItems>
        </ul>
    )
}

export default Desktop