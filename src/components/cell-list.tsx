import React from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) => data[id]);
  });

  const renderedCells = cells.map((cell) => (
    <div key={cell.id}>
      <AddCell nextCellId={cell.id} />
      <CellListItem cell={cell} />
    </div>
  ));

  return (
    <div>
      {renderedCells}
      <div className={`${cells.length === 0 ? 'force-visible' : ''}`}>
        <AddCell nextCellId={null} />
      </div>
    </div>
  );
};

export default CellList;
