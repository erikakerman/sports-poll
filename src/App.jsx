import { useState, useEffect, useMemo } from "react";
import EventCard from "./components/EventCard/EventCard";
import VotingSection from "./components/VotingSection/VotingSection";
import StatsDisplay from "./components/StatsDisplay/StatsDisplay";
import Summary from "./components/Summary/Summary";
import CategoryFilter from "./components/CategoryFilter/CategoryFilter";
import { getRandomEvent } from "./utils/eventHelpers";

// Import your events data
import events from "./data/events.json";

function App() {
  const [currentEvent, setCurrentEvent] = useState(null);
  const [votes, setVotes] = useState({});
  const [shownEvents, setShownEvents] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  // Filter events based on selected category
  const filteredEvents = useMemo(() => {
    if (selectedCategory === "ALL") {
      return events;
    }
    return events.filter((event) => event.sport === selectedCategory);
  }, [selectedCategory]);

  // Reset and start with new category
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setShownEvents([]);
    setVotes({});

    const availableEvents =
      category === "ALL"
        ? events
        : events.filter((event) => event.sport === category);

    const firstEvent = getRandomEvent(availableEvents, []);
    if (firstEvent) {
      setCurrentEvent(firstEvent);
      setShownEvents([firstEvent.id]);
    }
    setShowSummary(false);
  };

  useEffect(() => {
    const firstEvent = getRandomEvent(filteredEvents, []);
    if (firstEvent) {
      setCurrentEvent(firstEvent);
      setShownEvents([firstEvent.id]);
    }
  }, []);

  const handleVote = (choice) => {
    if (!currentEvent) return;

    setVotes((prev) => {
      const eventVotes = prev[currentEvent.id] || {
        homeVotes: 0,
        drawVotes: 0,
        awayVotes: 0,
      };

      return {
        ...prev,
        [currentEvent.id]: {
          ...eventVotes,
          homeVotes:
            choice === "home" ? eventVotes.homeVotes + 1 : eventVotes.homeVotes,
          drawVotes:
            choice === "draw" ? eventVotes.drawVotes + 1 : eventVotes.drawVotes,
          awayVotes:
            choice === "away" ? eventVotes.awayVotes + 1 : eventVotes.awayVotes,
          userVote: choice,
        },
      };
    });
  };

  const handleNextEvent = () => {
    // If we've shown all filtered events, show summary
    if (shownEvents.length >= filteredEvents.length) {
      setShowSummary(true);
      return;
    }

    const nextEvent = getRandomEvent(filteredEvents, shownEvents);
    if (nextEvent) {
      setCurrentEvent(nextEvent);
      setShownEvents((prev) => [...prev, nextEvent.id]);
    }
  };

  const handleRestart = () => {
    setShowSummary(false);
    setShownEvents([]);
    setVotes({});
    const firstEvent = getRandomEvent(filteredEvents, []);
    if (firstEvent) {
      setCurrentEvent(firstEvent);
      setShownEvents([firstEvent.id]);
    }
  };

  if (showSummary) {
    return (
      <div className="min-h-screen bg-[#fafafa] py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
          <Summary
            votes={votes}
            events={filteredEvents}
            onRestart={handleRestart}
          />
        </div>
      </div>
    );
  }

  const currentVote = currentEvent && votes[currentEvent.id]?.userVote;

  return (
    <div className="min-h-screen bg-[#fafafa] py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Sports Poll</h1>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
          <div className="flex items-center justify-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-600"></div>
            <p className="text-sm text-gray-600">
              Events shown: {shownEvents.length} / {filteredEvents.length}
            </p>
            <div className="h-2 w-2 rounded-full bg-blue-600"></div>
          </div>
        </div>

        <div className="space-y-6">
          <EventCard event={currentEvent} />

          <VotingSection
            onVote={handleVote}
            disabled={!!currentVote}
            currentVote={currentVote}
          />

          {currentEvent && <StatsDisplay eventVotes={votes[currentEvent.id]} />}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleNextEvent}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-full font-medium
                     hover:bg-blue-700 transition-all duration-200
                     flex items-center gap-2"
          >
            {shownEvents.length === filteredEvents.length - 1
              ? "Show Summary"
              : "Next Event"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        <footer className="text-center text-sm text-gray-500 mt-12">
          © 2024 Sports Poll App - Make your predictions
        </footer>
      </div>
    </div>
  );
}

export default App;
