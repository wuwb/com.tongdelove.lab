import React from 'react';
import Profile from './Profile';
import Today from './Today';
import HotNodes from './HotNodes';
import NewNodes from './NewDodes';
import Status from './Status';
import Ads from './Ads';


function Sidebar() {
    return (
        <div>
            <Profile />
            <Today />
            <HotNodes />
            <NewNodes />
            <Status />
            <Ads />
        </div>
    );
}

export default Sidebar;
