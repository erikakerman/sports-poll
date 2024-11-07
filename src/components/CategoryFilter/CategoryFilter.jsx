import PropTypes from "prop-types";

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: "ALL", label: "All Sports" },
    { id: "FOOTBALL", label: "Football" },
    { id: "TENNIS", label: "Tennis" },
    { id: "SNOOKER", label: "Snooker" },
    { id: "ICE_HOCKEY", label: "Ice Hockey" },
  ];

  return (
    <div className="flex justify-center mb-6">
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-2 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-700
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                 cursor-pointer hover:bg-gray-50 transition-colors"
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
};

CategoryFilter.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default CategoryFilter;
