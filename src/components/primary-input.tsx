"use-client"

import { InputHTMLAttributes } from "react"

const InputContainer = () => {
    return (
        <div className="relative w-80">
            <input className="
                bg-slate-600
                w-80 
                border-none
                rounded-sm
                py-1 
                px-2
                font-normal 
                text-sm 
                leading-5.5 
                text-[#d2d2e0]"
                placeholder="Pesquisar..."
            ></input>
            <svg className="absolute right-5 top-2/4 translate-y-2/4"></svg>
        </div>
    )
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

export const PrimaryInputWSearchIcon = (props: InputProps) => {
    return (
        <InputContainer {...props}>
        </InputContainer>
    )
}

export default PrimaryInputWSearchIcon;