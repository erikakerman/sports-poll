import PropTypes from "prop-types";

const Summary = ({ votes, events, onRestart }) => {
  const calculateEventSummary = () => {
    return events
      .map((event) => {
        const eventVotes = votes[event.id] || {
          homeVotes: 0,
          drawVotes: 0,
          awayVotes: 0,
        };
        const totalVotes =
          eventVotes.homeVotes + eventVotes.drawVotes + eventVotes.awayVotes;
        const mostVoted = Object.entries({
          "Home Win": eventVotes.homeVotes,
          Draw: eventVotes.drawVotes,
          "Away Win": eventVotes.awayVotes,
        }).reduce((a, b) => (a[1] > b[1] ? a : b))[0];

        return {
          ...event,
          totalVotes,
          mostVoted,
          votes: eventVotes,
        };
      })
      .sort((a, b) => b.totalVotes - a.totalVotes); // Sort by most votes
  };

  const summary = calculateEventSummary();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Voting Summary</h2>

      <div className="space-y-6">
        {summary.map((event) => (
          <div key={event.id} className="border-b pb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">
                  {event.sport} - {event.group}
                </h3>
                <p className="text-sm text-gray-600">
                  {event.homeName} vs {event.awayName}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{event.totalVotes} votes</p>
                <p className="text-sm text-gray-600">
                  Most voted: {event.mostVoted}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <div className="bg-blue-100 p-2 rounded">
                  <p className="text-center text-blue-800">
                    Home: {event.votes.homeVotes}
                    {event.totalVotes > 0 &&
                      ` (${Math.round(
                        (event.votes.homeVotes / event.totalVotes) * 100
                      )}%)`}
                  </p>
                </div>
              </div>
              <div>
                <div className="bg-gray-100 p-2 rounded">
                  <p className="text-center text-gray-800">
                    Draw: {event.votes.drawVotes}
                    {event.totalVotes > 0 &&
                      ` (${Math.round(
                        (event.votes.drawVotes / event.totalVotes) * 100
                      )}%)`}
                  </p>
                </div>
              </div>
              <div>
                <div className="bg-red-100 p-2 rounded">
                  <p className="text-center text-red-800">
                    Away: {event.votes.awayVotes}
                    {event.totalVotes > 0 &&
                      ` (${Math.round(
                        (event.votes.awayVotes / event.totalVotes) * 100
                      )}%)`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={onRestart}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Start New Session
        </button>
      </div>
    </div>
  );
};

Summary.propTypes = {
  votes: PropTypes.objectOf(
    PropTypes.shape({
      homeVotes: PropTypes.number,
      drawVotes: PropTypes.number,
      awayVotes: PropTypes.number,
      userVote: PropTypes.string,
    })
  ).isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      sport: PropTypes.string.isRequired,
      group: PropTypes.string.isRequired,
      homeName: PropTypes.string.isRequired,
      awayName: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRestart: PropTypes.func.isRequired,
};

export default Summary;
