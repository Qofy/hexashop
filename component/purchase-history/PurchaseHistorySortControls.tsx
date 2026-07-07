type Props = {
  sortBy: 'date' | 'total';
  onSort: (sortType: 'date' | 'total') => void;
  orderCount: number;
};

export default function PurchaseHistorySortControls({ sortBy, onSort, orderCount }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-gray-700 font-semibold">
            Total Orders: <span className="text-blue-600">{orderCount}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onSort('date')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              sortBy === 'date'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Sort by Date
          </button>
          <button
            onClick={() => onSort('total')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              sortBy === 'total'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Sort by Amount
          </button>
        </div>
      </div>
    </div>
  );
}
