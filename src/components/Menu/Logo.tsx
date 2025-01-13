const Logo = (): React.JSX.Element => {
    return (
        <div className="absolute top-[50%] -translate-y-[50%] left-5 text-white flex flex-col text-lg leading-5">
            <code >{'<Pedro'}</code>
            <code className="text-orange-400 ml-5 md:ml-7">{'Marques/>'}</code>
        </div>
    );
};

export default Logo;
