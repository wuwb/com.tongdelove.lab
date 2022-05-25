const LabsPage = () => {
    const links = [{
        link: 'https://animate.style/',
        title: 'animate.style',
    }, {
        link: 'https://elrumordelaluz.github.io/csshake/',
        title: 'csshake',
    }, {
        link: 'https://larsjung.de/jquery-qrcode/',
        title: 'qrcode'
    }];

    // https://github.com/grz/cpujs


    // 动画
    // http://tinyjs.net/guide/start.html

    return (
        <div>
            {links.map(item => {
                return (
                    <div key={item.title}>
                        <a href={item.link}>{item.title}</a>
                    </div>
                )
            })}
        </div>
    );
}

export default LabsPage;
