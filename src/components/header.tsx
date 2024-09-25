import Logo from "./logo";
import Navbar from "./navbar";

export function Header() {
    return (
        <header className='py-5 px-40'>
            <div className='flex flex-row items-center justify-between'>
                <Logo />
                <Navbar />
            </div>
        </header>
    );
}