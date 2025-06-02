import type { InputHTMLAttributes } from "react";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }


export function Input(props: InputProps) {
    return (
        <input
            className="w-[600px] h-[36px] bg-white outline-none px-3 rounded-sm"
            {...props}
        />
    )
}