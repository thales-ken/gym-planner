import { Righteous } from "next/font/google"

const righteousStencil = Righteous({
    subsets: ['latin'],
    weight: ['400']
})

const Logo = () => {
    return (
        <div>
            <a className={righteousStencil.className + " text-emphasis text-3xl"} href="/">Gym Planner</a>
        </div>
    );
}

export default Logo;