import styles from "./styles.module.css";

import logoSVG from "../../assets/rocket.svg";

export function Header() {

  return (
    <header className={styles.header}>
      <img 
        src={logoSVG} 
        alt="Imagem de um foguete apontado para cima." 
      />
      <strong>to<span>do</span></strong>
    </header>
  )

}