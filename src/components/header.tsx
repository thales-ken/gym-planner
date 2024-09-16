interface HeaderProps {

}

export function Header(props: HeaderProps) {
    return (
        <header className='text-red-500'>
            Teste
            <div className="p-10 flex flex-col gap-4">
                <div className="rounded-full h-10 w-10 bg-red-500 hover:w-96 transition-all hover:px-10 text-white"> Home </div>
                <div className="rounded-full h-10 w-10 bg-yellow-500 hover:w-96 transition-all hover:px-10 text-white"> Projects </div>
                <div className="rounded-full h-10 w-10 bg-green-500 hover:w-96 transition-all hover:px-10 text-white"> About Me </div>
            </div>
        </header>
    )
}