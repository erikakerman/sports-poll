import PropTypes from "prop-types";

const VotingSection = ({ onVote, disabled, currentVote }) => {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        onClick={() => onVote("home")}
        disabled={disabled}
        className={`
          px-6 py-2 rounded-full font-medium text-sm transition-all
          ${
            currentVote === "home"
              ? "bg-emerald-600 text-white"
              : "border border-emerald-600 text-emerald-600 hover:bg-emerald-50"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          min-w-[100px]
        `}
      >
        Home Win
      </button>
      <button
        onClick={() => onVote("draw")}
        disabled={disabled}
        className={`
          px-6 py-2 rounded-full font-medium text-sm transition-all
          ${
            currentVote === "draw"
              ? "bg-gray-700 text-white"
              : "border border-gray-700 text-gray-700 hover:bg-gray-50"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          min-w-[100px]
        `}
      >
        Draw
      </button>
      <button
        onClick={() => onVote("away")}
        disabled={disabled}
        className={`
          px-6 py-2 rounded-full font-medium text-sm transition-all
          ${
            currentVote === "away"
              ? "bg-rose-500 text-white"
              : "border border-rose-500 text-rose-500 hover:bg-rose-50"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          min-w-[100px]
        `}
      >
        Away Win
      </button>
    </div>
  );
};

VotingSection.propTypes = {
  onVote: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  currentVote: PropTypes.oneOf(["home", "draw", "away", null]),
};

VotingSection.defaultProps = {
  disabled: false,
  currentVote: null,
};

export default VotingSection;
