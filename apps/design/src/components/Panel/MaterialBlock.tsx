import SubTitle from './SubTitle';

interface Props {
    title: string;
    handleShowMore: Function;
}

const MaterialBlock = (props: Props) => {
    const { title, handleShowMore, children } = props;
    return (
        <div>
            <div>
                <SubTitle title={title} />
                <div onClick={handleShowMore}>更多</div>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
}

export default MaterialBlock;
