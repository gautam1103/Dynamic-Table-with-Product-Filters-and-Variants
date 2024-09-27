import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEdit, faGripVertical, faSearch, faTimes, faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
import './DynamicTable.css'; 

const images = [
  '/assets/img1.jpg',
  '/assets/img2.jpg',
  '/assets/img3.jpg',
  '/assets/img4.jpg',
  '/assets/img5.jpg',
  '/assets/img6.jpg',
  '/assets/img7.jpg',
  '/assets/img8.jpg',
  '/assets/img9.jpg',
  '/assets/img10.jpg',
  '/assets/img11.jpg',
  '/assets/img12.jpg',
  '/assets/img13.jpg',
  '/assets/img14.jpg',
  '/assets/img15.jpg',
  '/assets/img5.jpg',
];

const filters = ['Anarkali Kurtas', 'Shirts', 'Trousers', 'Jackets', 'Dresses', 'T-shirts', 'Jeans']; // Available filters

// Modal for selecting images
const Modal = ({ onClose, onImageSelect }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-icon" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
        <h3>Select a design to link</h3>
        <div className="search-box">
          <input type="text" placeholder="Search for images..." className="search-input" />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
        <div className="image-selection">
          {images.map((imgSrc, index) => (
            <div key={index} className="image-container">
              <img
                src={imgSrc}
                alt={`Option ${index + 1}`}
                className="image-option"
              />
              <button 
                className="insert-box" 
                onClick={() => onImageSelect(imgSrc)}
              >
                Insert
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Modal for selecting filters
const FilterModal = ({ onClose, onFilterSelect, selectedFilters }) => {
  const [filterState, setFilterState] = useState(selectedFilters || []);

  const toggleFilter = (filter) => {
    if (filterState.includes(filter)) {
      setFilterState(filterState.filter((item) => item !== filter));
    } else {
      setFilterState([...filterState, filter]);
    }
  };

  const handleSubmit = () => {
    onFilterSelect(filterState);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-icon" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
        <h3>Select Filters</h3>
        <div className="filter-selection">
          {filters.map((filter, index) => (
            <div key={index} className="filter-item">
              <label>
                <input
                  type="checkbox"
                  checked={filterState.includes(filter)}
                  onChange={() => toggleFilter(filter)}
                />
                {filter}
              </label>
            </div>
          ))}
        </div>
        <button className="submit-filters-btn" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

// Main DynamicTable component
const DynamicTable = () => {
  const initialRows = [
    { id: '1', productFilter: ['Anarkali Kurtas'], variants: { 0: '/assets/img7.jpg', 1: '/assets/img2.jpg' } },
    { id: '2', productFilter: ['Shirts'], variants: { 0: '/assets/img11.jpg', 1: '/assets/img14.jpg' } },
    { id: '3', productFilter: ['Jackets'], variants: { 0: '/assets/img12.jpg', 1: '/assets/img15.jpg' } },
    { id: '4', productFilter: ['Dresses'], variants: { 0: '/assets/img13.jpg', 1: '/assets/img6.jpg' } },
  ];

  const [rows, setRows] = useState(initialRows);
  const [columns, setColumns] = useState(["Primary Variant", "Variant 2"]);
  const [draggedRowIndex, setDraggedRowIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false); // For filter modal
  const [selectedCell, setSelectedCell] = useState({ rowId: null, columnIndex: null });
  const [alertMessage, setAlertMessage] = useState(''); // State for alert message

  const addRow = () => {
    const newRow = {
      id: (rows.length + 1).toString(),
      productFilter: [],
      variants: {},
    };
    setRows((prevRows) => [...prevRows, newRow]);
    showAlert('State added!');
  };

  const addColumn = () => {
    const newColumn = `Variant ${columns.length + 1}`;
    setColumns((prevColumns) => [...prevColumns, newColumn]);
    showAlert('Variant added');
  };

  const deleteRow = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    showAlert('State removed');
  };

  const deleteColumn = (index) => {
    setColumns((prevColumns) => prevColumns.filter((_, colIndex) => colIndex !== index));
    showAlert('Variant removed');
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage('');
    }, 3000);
  };

  const handleDragStart = (index) => {
    setDraggedRowIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (index) => {
    const updatedRows = Array.from(rows);
    const [removed] = updatedRows.splice(draggedRowIndex, 1);
    updatedRows.splice(index, 0, removed);
    setRows(updatedRows);
    setDraggedRowIndex(null);
  };

  const openModal = (rowId, columnIndex) => {
    setSelectedCell({ rowId, columnIndex });
    setShowModal(true);
  };

  const openFilterModal = (rowId) => {
    setSelectedCell({ rowId, columnIndex: null });
    setShowFilterModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeFilterModal = () => {
    setShowFilterModal(false);
  };

  const handleImageSelect = (imgSrc) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === selectedCell.rowId
          ? {
              ...row,
              variants: {
                ...row.variants,
                [selectedCell.columnIndex]: imgSrc,
              },
            }
          : row
      )
    );
    closeModal();
    showAlert("Variant Template Updated");
  };

  const handleFilterSelect = (selectedFilters) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === selectedCell.rowId
          ? {
              ...row,
              productFilter: selectedFilters,
            }
          : row
      )
    );
    showAlert("Product Filter Updated");
  };

  return (
    <div className="container">
      {alertMessage && (
        <div className="alert">
          <span className="check-mark">✔️</span> {alertMessage}
        </div>
      )}
      <div className="table-wrapper">
        <table className="dynamic-table">
          <thead>
            <tr>
              <th className='cls-sticky'>Serial Number</th>
              <th className='cls-sticky1' id='productFilter'>Product Filter</th>
              {columns.map((col, index) => (
                <th key={index}>
                  {col}
                  {col !== 'Serial Number' && col !== 'Product Filter' && (
                    <FontAwesomeIcon icon={faEllipsisVertical} style={{ marginLeft: '40px' }} />
                  )}
                  <span className="delete-icon" onClick={() => deleteColumn(index)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                </th>
              ))}
              <th style={{ border: "none", backgroundColor: "white" }}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                draggable
                onDragStart={() => handleDragStart(rowIndex)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(rowIndex)}
                style={{ backgroundColor: draggedRowIndex === rowIndex ? '#e6f7ff' : 'transparent' }}
              >
                <td className="serial-cell cls-sticky">
                  {rowIndex + 1}
                  <span className="drag-handle">
                    <FontAwesomeIcon icon={faGripVertical} />
                  </span>
                  <span className="delete-icon" onClick={() => deleteRow(row.id)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                </td>
                <td className='cls-sticky1'>
                  <div className="product-filter-container">
                    {row.productFilter.map((filter, idx) => (
                      <div key={idx} className="product-filter-item">
                        {filter}
                      </div>
                    ))}
                    <button className="add-filter-btn" onClick={() => openFilterModal(row.id)}>
                      ➕ Add Filter
                    </button>
                  </div>
                </td>
                {columns.map((_, colIndex) => (
                  <td key={colIndex} className="variant-cell">
                    <div className="image-wrapper">
                      {row.variants[colIndex] ? (
                        <>
                          <img src={row.variants[colIndex]} alt="Selected" className="variant-image" />
                          <button
                            className="edit-image-btn"
                            onClick={() => openModal(row.id, colIndex)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        </>
                      ) : (
                        <div icon="fa-solid fa-plus" className="add-design-box" onClick={() => openModal(row.id, colIndex)}>
                          ➕Add Design
                        </div>
                      )}
                    </div>
                  </td>
                ))}
                <td style={{ border: "none" }}>
                  <button onClick={addColumn} className="add-column-btn cls-btn">
                    ➕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addRow} className='cls-btn'>➕</button>
      </div>

      {/* Product Filter Modal */}
      {showFilterModal && (
        <FilterModal
          onClose={closeFilterModal}
          onFilterSelect={handleFilterSelect}
          selectedFilters={rows.find(row => row.id === selectedCell.rowId)?.productFilter || []}
        />
      )}

      {/* Variant Image Modal */}
      {showModal && <Modal onClose={closeModal} onImageSelect={handleImageSelect} />}
    </div>
  );
};

export default DynamicTable;
