import './add-cell.css';
import { useActions } from '../hooks/useActions';

interface AddCellProps {
  nextCellId: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
  const { insertCellBefore } = useActions();
  return (
    <div className="add-cell-wrapper">
      <button
        className="button is-small add-buttons is-rounded"
        onClick={() => insertCellBefore(nextCellId, 'code')}
      >
        <span className="icon is-small">
          <i className="fas fa-plus"></i>
        </span>
        <span>Add Code Cell</span>
      </button>
      <button
        className="button is-small add-buttons is-rounded"
        onClick={() => insertCellBefore(nextCellId, 'text')}
      >
        <span className="icon is-small">
          <i className="fas fa-plus"></i>
        </span>
        <span>Add Text Cell</span>
      </button>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
