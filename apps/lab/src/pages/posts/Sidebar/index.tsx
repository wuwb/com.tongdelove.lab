import Recently from './Recently';
import Archived from './Archived';
import Tags from './Tags';
import RecentlyComments from './RecentlyComments';
import Search from './Search';


function Sidebar() {
    return (
        <div>
            <Recently />
            <Archived />
            <Tags />
            <RecentlyComments />
            <Search />
        </div>
    );
}

export default Sidebar;
