import './add-cell.css';
import { useActions } from '../hooks/useActions';

interface AddCellProps {
  nextCellId: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
  const { insertCellBefore } = useActions();
  return (
    <div className="add-cell-wrapper" style={{ textAlign: 'center' }}>
      <button
        className="button is-small"
        onClick={() => insertCellBefore(nextCellId, 'code')}
      >
        Add Code Cell
      </button>
      <div className="dot"></div>
      <button
        className="button is-small"
        onClick={() => insertCellBefore(nextCellId, 'text')}
      >
        Add Text Cell
      </button>
    </div>
  );
};

export default AddCell;
