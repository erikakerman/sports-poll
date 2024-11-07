// utils/localStorage.js

export const saveVotes = (votes) => {
    try {
        localStorage.setItem('sportsPollVotes', JSON.stringify(votes));
        return true;
    } catch (error) {
        console.error('Error saving votes:', error);
        return false;
    }
};

export const loadVotes = () => {
    try {
        const votes = localStorage.getItem('sportsPollVotes');
        return votes ? JSON.parse(votes) : {};
    } catch (error) {
        console.error('Error loading votes:', error);
        return {};
    }
};