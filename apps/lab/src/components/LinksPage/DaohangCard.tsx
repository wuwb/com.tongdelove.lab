export function DaohangCard(props) {
  const { item } = props
  return (

    <div className="url-card col-6 col-sm-6 col-md-4 col-xl-5a col-xxl-6a ">
      <div className="url-body default">
        <a
          href={item.path}
          target="_blank"
          className="group bg-white border-0 mb-4 shadow-md transition duration-300 ease-in-out block rounded h-[60px]"
          style={{
            boxShadow: '0px 0px 20px -5px rgba(158, 158, 158, 0.2)'
          }}
        >
          <div className="p-3">
            <div className="flex items-center">
              <div className="url-info flex-fill">
                <div className="text-sm font-bold line-clamp-1 group-hover:text-[#f1404b]">
                  {item.name}
                </div>
                <p className="m-0 text-xs line-clamp-1">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        </a>
        <a href={item.path} className="togo text-center text-muted is-views" data-id="689"
          data-toggle="tooltip" data-placement="right" title="直达" rel="nofollow">
          <i className="iconfont icon-goto"></i>
        </a>
      </div>
    </div>
  )
}
