import styles from './styles.module.scss';

interface PropsButton {
  backgroundColor?: string;
  text?: string;
  borderRadius?: number;
  onClick?: () => void;
}

export function ButtonGeneric () {
  return (
    <>
    {/*  <button 
        className={styles.button}
        title={styles.buttonTitle}
        backgroundColor={props}
        onClick={onClick}
      >
      </button>
    */}
    <section className='section'>
      <button className={styles.btn}>
        <a>COMPRAR INGRESSO</a>
      </button>
    </section>
    

    </>
  )
}