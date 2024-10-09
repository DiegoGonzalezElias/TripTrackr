import { SVGProps } from "react";

export function MapIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M14.35 20.775L9 18.9l-4.65 1.8q-.25.1-.488.063t-.437-.163t-.312-.337T3 19.775V5.75q0-.325.188-.575T3.7 4.8l4.65-1.575q.15-.05.313-.075T9 3.125t.338.025t.312.075L15 5.1l4.65-1.8q.25-.1.488-.062t.437.162t.313.338t.112.487V18.25q0 .325-.187.575t-.513.375l-4.65 1.575q-.15.05-.312.075t-.338.025t-.337-.025t-.313-.075M14 18.55V6.85l-4-1.4v11.7zm2 0l3-1V5.7l-3 1.15zM5 18.3l3-1.15V5.45l-3 1zM16 6.85v11.7zm-8-1.4v11.7z"></path></svg>
    )
}