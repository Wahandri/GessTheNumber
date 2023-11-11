import React, { useState } from 'react';
import "./Start.css";
import Logotipo from "../logotipo/logotipo.js";

export default function Start() {
    const [nivel, setNivel] = useState(1);
    const [valorInput, setValorInput] = useState('');
    const [mensaje, setMensaje] = useState('Adivina un número del 1 al 10');
    const [intentos, setIntentos] = useState(10);
    const [historial, setHistorial] = useState([]);
    const [numeroAleatorio, setNumeroAleatorio] = useState(generarNumeroAleatorio(1, 10));

    function generarNumeroAleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const actualizarDificultad = () => {
        return 10 * Math.pow(2, nivel - 1);
    };

    const manejarCambioInput = (event) => {
        setValorInput(event.target.value);
    };

    const reiniciarJuego = () => {
        setNivel(1);
        setValorInput('');
        setMensaje('Adivina un número del 1 al 10');
        setIntentos(10);
        setHistorial([]);
        setNumeroAleatorio(generarNumeroAleatorio(1, 10));
    };

    const checkingNumber = () => {
        const numeroUsuario = parseInt(valorInput, 10);

        if (isNaN(numeroUsuario)) {
            setMensaje(`Por favor, ingrese un número válido`);
        } else if (numeroUsuario < 1 || numeroUsuario > (actualizarDificultad())) {
            setMensaje(`Por favor, ingrese un número entre 1 y ${actualizarDificultad()}.`);
        } else {
            setIntentos(intentos - 1);

            let mensajePrincipal = '';
            if (numeroUsuario < numeroAleatorio) {
                mensajePrincipal = `El número que buscas es MAYOR que ${valorInput}.`;
            } else if (numeroUsuario > numeroAleatorio) {
                mensajePrincipal = `El número que buscas es MENOR que ${valorInput}.`;
            } else {
                mensajePrincipal = `¡Felicidades! Has adivinado el número correcto en ${10 - intentos} intentos. ¡Subes al siguiente nivel!`;
                setValorInput("");
                setIntentos(10);

                // Subir de nivel
                setNivel(nivel + 1);

                // Agregar entrada al historial
                setHistorial([...historial, `Nivel ${nivel - 1}: ${10 - intentos} intentos`]);

                // Generar nuevo número aleatorio
                const nuevoNumeroAleatorio = generarNumeroAleatorio(1, actualizarDificultad());
                setNumeroAleatorio(nuevoNumeroAleatorio);
            }

            if (intentos === 1) {
                setMensaje(`¡Oh no! Has agotado tus intentos. Has perdido. Vuelve a intentarlo.`);
                setTimeout(() => {
                    reiniciarJuego();
                }, 3000);
            } else {
                setMensaje(
                    <>
                        <p className='msj1'>{mensajePrincipal}</p>
                        <p className='msj2'>Del 1 a {actualizarDificultad()}</p>
                    </>
                );
            }
        }
    };

    const manejarEnter = (event) => {
        if (event.key === 'Enter') {
            checkingNumber();
            setValorInput("");
        }
    };

    return (
        <div className='flex'>
            <Logotipo />
            <h1 className='title'>Guess The Number</h1>
            <h1 className='level'>Nivel: {nivel}</h1>
            <div className='board flex myFont'>
                <div className='flexEnd'>
                    Intentos: {intentos}
                </div>
                <div className='insideBoard flex'>
                    {mensaje}
                </div>
            </div>
            <div>
                <input 
                    className='custom-input'
                    type="number" 
                    id="input" 
                    name="nombre" 
                    value={valorInput}
                    onChange={manejarCambioInput}
                    onKeyPress={manejarEnter}
                    placeholder={`Número entre 1 y ${actualizarDificultad()}`}
                />
                <button className='custom-button' onClick={checkingNumber}>Enviar</button>
            </div>
            
            <ul>
                {historial.map((registro, index) => (
                    <li key={index}>{registro}</li>
                ))}
            </ul>
        </div>
    );
}
