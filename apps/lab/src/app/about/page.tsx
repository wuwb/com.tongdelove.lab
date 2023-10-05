'use client';

export default function About(props) {
    // useEffect(() => {
    //     // 百度地图API功能
    //     let map = new BMapGL.Map('baidu_map'); // 创建Map实例
    //     var point = new BMapGL.Point(116.404, 39.913);
    //     map.centerAndZoom(point, 15);
    // }, []);
    // {/* <script src="//https://api.map.baidu.com/getscript?type=webgl&v=1.0&ak=3nK45EVwE07POcQtPNFFOf0jtV6ImDuo&services=&t=20220914213950" defer></script> */}

    return (
        <div>
            <div>关于页面</div>

            <div id="allmap"></div>

            <div className="p-10 text-3xl text-center">
                我们将通过推荐精选职位、知识分享及技能培训等，帮助更多人找到理想的远程工作。扫码关注公众号 →
            </div>

            <div className="flex flex-col">
                <div>公司介绍</div>
                <div>
                    我们是业界领先的软件研发团队，致力于为互联网公司和品牌市场提供深度、丰富的互动解决方案；通过热门风口的敏锐把控，建立对目标客户和用户行为的有效分析，再整合我们高友好度的交互设计和前沿技术，从而产生创意十足、有价值的系统应用。
                    XX网络有限公司拥有丰富的互联网产品策划、设计、开发经验，帮助客户领跑行业，是我们赖以生存的坚定信念！我们坚信每一个成功项目是良好团队合作的成果，我们共同思考和创新，为客户提供有价值的互动解决方案。
                    我们已经帮助众多知名客户提升他们的品牌和客户关系，同时期待与更多的互联网从业者携手前行！
                </div>
            </div>

            <div className="flex"></div>
            <div id="baidu_map">地图</div>

            <div className="flex">
                <div>团队介绍</div>
                <div>
                    我们焦躁不安的创新欲望让我们一直着眼于未来。我们不断地询问下一步是什么？
                    这意味着，我们将不断推陈出新，以帮助您在互联网保持领先。
                </div>
            </div>
            <div>
                公司理念

                经营理念

                成就客户 诚信经营


                服务理念

                专业 合作 创新


                企业格言

                以创新为动力，以质量求发展
            </div>
        </div>
    );
};

