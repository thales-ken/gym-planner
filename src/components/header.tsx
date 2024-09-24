import { Saira_Stencil_One } from "next/font/google"

const sairaStencil = Saira_Stencil_One({
    subsets: ['latin'],
    weight: ['400']
})

interface HeaderProps {

}

export function Header(props: HeaderProps) {
    return (
        <header className='flex items-center justify-between py-5 px-40'>
            <div>
                <a className={sairaStencil.className}>Gym-Planner</a>
            </div>
        </header>
    )
}