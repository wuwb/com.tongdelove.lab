import cn from 'classnames';
import DaohangCard from './DaohangCard';
import navs from './nav';
import styles from './Daohang.module.css';

function renderNav() {
    return navs.map(list => {
        return (
            <div key={list.name}>
                <h3 className={cn(styles.cateTitle)}>{list.name}</h3>
                <div className="grid grid-cols-6 gap-4">
                    {
                        list.children.map(item => {
                            return (
                                <DaohangCard key={item.name} item={item} />
                            )
                        })
                    }
                </div>
            </div>
        );
    });
}

export default function Daohang() {
    return (
        <div>
            {renderNav()}
        </div>
    )
}
