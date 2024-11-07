import PropTypes from "prop-types";

const EventCard = ({ event }) => {
  if (!event) return null;

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-3xl shadow-sm overflow-hidden">
      <div className="p-8">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">
          {event.sport} - {event.group}
        </h2>
        <div className="flex justify-center items-center space-x-8">
          <div className="text-center">
            <span className="text-lg font-medium text-emerald-600">
              {event.homeName}
            </span>
          </div>
          <div>
            <span className="text-gray-400 text-lg">vs</span>
          </div>
          <div className="text-center">
            <span className="text-lg font-medium text-rose-500">
              {event.awayName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    sport: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired,
    homeName: PropTypes.string.isRequired,
    awayName: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }),
};

export default EventCard;
