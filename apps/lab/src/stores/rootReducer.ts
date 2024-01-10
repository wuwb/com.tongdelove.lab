import { combineReducers } from '@reduxjs/toolkit';
import undoable from 'redux-undo';

// import { reducer as calendarReducer } from '@/slices/calendar';
// import { reducer as projectsBoardReducer } from '@/slices/projects_board';
// import { reducer as mailboxReducer } from '@/slices/mailbox';
// import { reducer as mailboxReducer } from '@/slices/mailbox';
// import { reducer as mailboxReducer } from '@/slices/mailbox';
import authReducer from '@/stores/authSlice';

export const rootReducer = combineReducers({
    // calendar: calendarReducer,
    // projectsBoard: projectsBoardReducer,
    // mailbox: mailboxReducer
    auth: authReducer,
});
