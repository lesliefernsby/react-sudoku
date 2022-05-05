import styles from './Cell.module.css'

const Cell = (props) => {
  return(
    <div className={props.cell.isSolved() ? `${styles.Cell} ${styles.solved}` : props.cell.singleCandidate() ? `${styles.Cell} ${styles.singleCandidate}` : styles.Cell}>
      <span className={styles.Value}>{props.cell.value}</span> 
      <p> {props.cell.candidates}</p>
    </div>
  )
}

export default Cell;
