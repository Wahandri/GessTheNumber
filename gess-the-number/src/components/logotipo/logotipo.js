import React from 'react';
import "./logotipo.css";
import logo from "./logotipo.png"

export default function logotipo() {
  return (
    <div className='flex'>
        <img className='logo' src={logo} alt=''/>
        <span className="developerText">
            <p>Desarrollado por Wahandri</p>
            <div>

            </div>
        </span>
    </div>
  )
}
