import PropTypes from "prop-types";
import { calculateVotePercentages } from "../../utils/eventHelpers";

const StatsDisplay = ({ eventVotes }) => {
  const percentages = calculateVotePercentages(eventVotes);

  return (
    <div className="mt-8 space-y-3 max-w-lg mx-auto px-4">
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Home Win</span>
          <span className="text-sm text-emerald-600">{percentages.home}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${percentages.home}%` }}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Draw</span>
          <span className="text-sm text-gray-600">{percentages.draw}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="bg-gray-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${percentages.draw}%` }}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Away Win</span>
          <span className="text-sm text-rose-500">{percentages.away}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="bg-rose-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${percentages.away}%` }}
          />
        </div>
      </div>
    </div>
  );
};

StatsDisplay.propTypes = {
  eventVotes: PropTypes.shape({
    homeVotes: PropTypes.number,
    drawVotes: PropTypes.number,
    awayVotes: PropTypes.number,
    userVote: PropTypes.oneOf(["home", "draw", "away"]),
  }),
};

StatsDisplay.defaultProps = {
  eventVotes: {
    homeVotes: 0,
    drawVotes: 0,
    awayVotes: 0,
  },
};

export default StatsDisplay;
