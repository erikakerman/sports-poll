// utils/eventHelpers.js

export const getRandomEvent = (events, shownEvents) => {
    console.log('Getting random event:', {
        totalEvents: events.length,
        shownEventsCount: shownEvents.length,
        shownEventIds: shownEvents
    });

    // Filter available events
    const availableEvents = events.filter(
        event => !shownEvents.includes(event.id)
    );

    console.log('Available events:', {
        count: availableEvents.length,
        events: availableEvents
    });

    if (availableEvents.length === 0) {
        console.log('No available events left');
        return null;
    }

    const randomIndex = Math.floor(Math.random() * availableEvents.length);
    const selectedEvent = availableEvents[randomIndex];
    console.log('Selected event:', selectedEvent);

    return selectedEvent;
};

export const calculateVotePercentages = (eventVotes) => {
    if (!eventVotes) return { home: 0, draw: 0, away: 0 };

    const total = eventVotes.homeVotes + eventVotes.drawVotes + eventVotes.awayVotes;

    if (total === 0) return { home: 0, draw: 0, away: 0 };

    const percentages = {
        home: Math.round((eventVotes.homeVotes / total) * 100),
        draw: Math.round((eventVotes.drawVotes / total) * 100),
        away: Math.round((eventVotes.awayVotes / total) * 100)
    };

    console.log('Calculated percentages:', { eventVotes, percentages });

    return percentages;
};