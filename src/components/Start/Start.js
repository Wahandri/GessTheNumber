import React, { useState } from 'react';
import positTitle from "../../images/posit.png";
import "./Start.css";
import MAS from "../../images/flecha-arriba.png";
import MENOS from "../../images/flecha-hacia-abajo.png";
import Footer from "../Footer/Footer";
import victorySound from "../../sounds/pokemonVictoria.mp3";
import nextLevelSound from "../../sounds/pokemonNext.mp3";
import VideoPopup from "../VideoPopup/VideoPopup";

export default function Start() {
    const [nivel, setNivel] = useState(1);
    const [valorInput, setValorInput] = useState('');
    const [mensaje, setMensaje] = useState('Introduce un número del 1 al 10');
    const [intentos, setIntentos] = useState(10);
    const [historial, setHistorial] = useState([]);
    const [totalIntentos, setTotalIntentos] = useState(0);
    const [numeroAleatorio, setNumeroAleatorio] = useState(generarNumeroAleatorio(1, 10));
    const [imagenFlecha, setImagenFlecha] = useState(null); // Estado para la imagen de la flecha
    const [juegoTerminado, setJuegoTerminado] = useState(false);
    const [mostrarBotonReinicio, setMostrarBotonReinicio] = useState(false);
    const audioFinal = new Audio(victorySound);
    const audioNext = new Audio(nextLevelSound);

    const [isVideoOpen, setVideoOpen] = useState(false);

    const handleOpenVideo = () => {
        setVideoOpen(true);
    };

    const handleCloseVideo = () => {
        setVideoOpen(false);
    };

    // Numero aleatorio
    function generarNumeroAleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Subir de nivel
    const actualizarDificultad = () => {
        return 10 * Math.pow(2, nivel - 1);
    };

    // Numero seleccionado
    const manejarCambioInput = (event) => {
        setValorInput(event.target.value);
    };

    // Reiniciar juego
    const reiniciarJuego = () => {
        setNivel(1);
        setValorInput('');
        setMensaje('Introduce un número del 1 al 10');
        setIntentos(10);
        setHistorial([]);
        setTotalIntentos(0);
        setNumeroAleatorio(generarNumeroAleatorio(1, actualizarDificultad()));
        setImagenFlecha(null); // Reiniciar el estado de imagenFlecha
        setJuegoTerminado(false);
        setMostrarBotonReinicio(false); // Ocultar el botón de reinicio al reiniciar el juego
    };

    // Logica del juego
    const checkingNumber = () => {
        const numeroUsuario = parseInt(valorInput, 10);

        if (isNaN(numeroUsuario)) {
            setMensaje(`Por favor, ingrese un número válido`);
        } else if (numeroUsuario < 1 || numeroUsuario > actualizarDificultad()) {
            setMensaje(`Por favor, ingrese un número entre 1 y ${actualizarDificultad()}.`);
        } else {
            setIntentos(intentos - 1);

            let mensajePrincipal = '';
            let mensajeSecundario = '';
            let flecha = null;

            if (numeroUsuario < numeroAleatorio) {
                mensajePrincipal = `El número que buscas es MAYOR que ${valorInput}.`;
                mensajeSecundario = `Del 1 a ${actualizarDificultad()}`
                flecha = <img className='flechita' src={MAS} alt=''/>;
                setImagenFlecha(MAS); // Establecer la imagen de la flecha
                setTotalIntentos(totalIntentos + 1);
            } else if (numeroUsuario > numeroAleatorio) {
                mensajePrincipal = `El número que buscas es MENOR que ${valorInput}.`;
                mensajeSecundario = `Del 1 a ${actualizarDificultad()}`
                flecha = <img className='flechita' src={MENOS} alt=''/>;
                setImagenFlecha(MENOS); // Establecer la imagen de la flecha
                setTotalIntentos(totalIntentos + 1);
            } else if (nivel < 10) {
                setValorInput("");
                setIntentos(10);

                // Subir de nivel
                setNivel(nivel + 1);

                // Agregar historial de numeros
                setTotalIntentos(totalIntentos + 1);

                // Generar nuevo número aleatorio
                const nuevoNumeroAleatorio = generarNumeroAleatorio(1, actualizarDificultad());
                setNumeroAleatorio(nuevoNumeroAleatorio);

                // Mostrar mensaje durante 3 segundos
                audioNext.play();
                setMensaje(
                    <>
                    ¡Correcto! el numero era el {numeroAleatorio}
                    <br />
                    ¡Subes de nivel!
                    </>
                );
                
                setTimeout(() => {
                    setMensaje(`Introduce un número del 1 al ${actualizarDificultad() * 2}`);
                }, 1500);
                
                // Salir de la función para evitar la actualización duplicada de estado
                return;
            } else {
                setTotalIntentos(totalIntentos + 1);
                setJuegoTerminado(true);
                setHistorial([...historial, `Nivel ${nivel}: ${10 - intentos} intentos`]);

                
                mensajePrincipal = `¡Enhorabuena! Has completado el juego en ${totalIntentos + 1} intentos`;
                audioFinal.play();
                setMensaje(
                    <>
                        <p className='msj1'>{mensajePrincipal}</p>
                        <button className='custom-button' onClick={() => {reiniciarJuego()}}>Volver a jugar</button>
                    </>
                )
                return;
            }

            // Intentos agotados
            if (intentos === 1 && !juegoTerminado) {
                setMensaje(`¡Oh no! Has agotado tus intentos. Has perdido. Vuelve a intentarlo.`);
                setMostrarBotonReinicio(true);
                handleOpenVideo(); 
            } else if (!juegoTerminado) {
                setMensaje(
                    <>
                        <p className='msj1'>{mensajePrincipal}</p>
                        {flecha}
                        <p className='msj2'>{mensajeSecundario}</p>
                    </>
                );
            } else if (juegoTerminado) {
                setMensaje(
                    <>
                    <p className='msj1'>{mensajePrincipal}</p>
                    <button className='custom-button' onClick={reiniciarJuego}>Volver a jugar</button>
                    </>
                )
            }
        }
    };


    // Usar ENTER para 
    const manejarEnter = (event) => {
        if (event.key === 'Enter') {
            checkingNumber();
            setValorInput("");
        }
    };

    return (
        <div className='flex'>
            <img className='imgPosit' src={positTitle} alt=''/>
            <h1 className='level'>Nivel: {nivel}</h1>
            <div className='board flex myFont'>
                <div className='flexEnd'>
                    Intentos: {intentos}
                </div>
                <div className='insideBoard flex'>
                    {mensaje}
                    {mostrarBotonReinicio && (
                        <button className='custom-button' onClick={() => {reiniciarJuego(); setMostrarBotonReinicio(false);}}>Volver a jugar</button>
                    )}
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
                    onKeyDown={manejarEnter}
                    placeholder={`Número entre 1 y ${actualizarDificultad()}`}
                />
                <button className='custom-button' onClick={checkingNumber}>Enviar</button>
            </div>
            
            <VideoPopup isOpen={isVideoOpen} onClose={handleCloseVideo} />
            <Footer/>
        </div>
    );
}
