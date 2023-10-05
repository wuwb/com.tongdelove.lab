type Props = {
    content: string
}
const ArticleContent = (props: Props) => {
    return (
        <div className="max-w-2xl mx-auto">
            <div
                dangerouslySetInnerHTML={{ __html: props.content }}
            />
        </div>
    );
}

export default ArticleContent;
