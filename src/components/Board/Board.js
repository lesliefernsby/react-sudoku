import Cell from "./Cell"
import styles from './Board.module.css'

const Board = (props) => {
  let rows = [0,1,2,3,4,5,6,7,8];
  console.log(props);
  return(
    <div className={styles.Board}>
      {rows.map((row) => 
        <div key={row} className={styles.Row}>
          {props.data.cells.filter((cell) => cell.row === row)
                            .map((cell) => <Cell key={cell.id} cell={cell} /> )}
        </div>
      )}
      
      
    </div>
  )
}

export default Board;
