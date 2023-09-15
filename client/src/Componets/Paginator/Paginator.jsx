import React, { useEffect, useState } from 'react';
import styles from "./Paginator.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from '../../Redux/actions';

export default function Paginator({ driverLength }) {
  const pagina = useSelector(state => state.actualPage);
  const dispatch = useDispatch();

  // Cálculo para mostrar solo 10 páginas a la vez
  const paginasTotales = Math.ceil((driverLength + 1) / 9);
  const paginasVisibles = 10;
  const mitadPaginasVisibles = Math.floor(paginasVisibles / 2);

  const paginas = [];
  let inicioPagina = pagina - mitadPaginasVisibles;
  inicioPagina = Math.max(inicioPagina, 1);
  let finPagina = inicioPagina + paginasVisibles - 1;
  finPagina = Math.min(finPagina, paginasTotales);

  for (let i = inicioPagina; i <= finPagina; i++) {
    paginas.push(i);
  }

  const paginaAnterior = () => {
    if (pagina !== 1) {
      dispatch(changePage(pagina - 1));
    }
    window.scroll({ top: 0, behavior: 'smooth' });
  }

  const primerPagina = () => {
    if (pagina !== 1) {
      dispatch(changePage(1));
    }
    window.scroll({ top: 0, behavior: 'smooth' });
  }

  const paginaSiguiente = () => {
    if (pagina !== paginasTotales) {
      dispatch(changePage(pagina + 1));
    }
    window.scroll({ top: 0, behavior: 'smooth' });
  }

  const ultimaPagina = () => {
    if (pagina !== paginasTotales) {
      dispatch(changePage(paginasTotales));
    }
    window.scroll({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className={styles.divPaginator}>
      <button className={styles.botonP} onClick={primerPagina}> « </button>
      <button className={styles.botonP} onClick={paginaAnterior}> ◀ </button>
      {paginas.map(paginaNumero => (
        <button
          key={paginaNumero}
          value={paginaNumero}
          onClick={() => {
            window.scroll({ top: 0, behavior: 'smooth' });
            dispatch(changePage(paginaNumero));
          }}
          className={paginaNumero === pagina ? styles.selectedPage : styles.page}
        >
          {paginaNumero}
        </button>
      ))}
      <button className={styles.botonP} onClick={paginaSiguiente}> ▶ </button>
      <button className={styles.botonP} onClick={ultimaPagina}> » </button>
    </div>
  )
}

