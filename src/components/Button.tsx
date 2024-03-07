import React from 'react';

interface Props{
    label: any;
    onClick: any
}

const Button: React.FC<Props>= ({label,onClick})=>{
    return (
    <button className='m-0.5 p-2 border rounded hover:font-bold hover:border-cyan-500 ' onClick={onClick} >{label}</button>

    )


}

export default Button