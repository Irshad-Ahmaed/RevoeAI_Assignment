import { useState } from 'react';

export default function AddColumnModal({ onAddColumn }) {
  const [isOpen, setIsOpen] = useState(false);
  const [columnName, setColumnName] = useState('');
  const [columnType, setColumnType] = useState('text');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddColumn({ name: columnName, type: columnType });
    setIsOpen(false);
    setColumnName('');
    setColumnType('text');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add Column
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Column</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Column Name</label>
                <input
                  type="text"
                  value={columnName}
                  onChange={(e) => setColumnName(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Column Type</label>
                <select
                  value={columnType}
                  onChange={(e) => setColumnType(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="text">Text</option>
                  <option value="date">Date</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}