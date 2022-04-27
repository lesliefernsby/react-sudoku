import styles from './Cell.module.css'

const Cell = (props) => {
  return(
    <div className={styles.Cell}>
      <span className={styles.Value}>{props.cell.value}</span> 
    </div>
  )
}

export default Cell;
