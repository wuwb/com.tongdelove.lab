import classNames from 'clsx'

const FeatureRowsGroup = ({ data }) => {
  return (
    <div className="container flex flex-col gap-12 py-12">
      {data.features.map((feature, index) => (
        <div
          className={classNames(
            // Common classes
            'flex flex-col justify-start gap-10 md:items-center md:justify-between',
            {
              'lg:flex-row': index % 2 === 0,
              'lg:flex-row-reverse': index % 2 === 1,
            }
          )}
          key={feature.id}
        >
          {/* Text section */}
          <div className="w-full text-lg lg:w-6/12 lg:pr-6">
            <h3 className="title">{feature.title}</h3>
            <p className="my-6">{feature.description}</p>
            {/*<CustomLink link={feature.link}>*/}
            {/*  <div className="text-blue-600 with-arrow hover:underline">*/}
            {/*    {feature.link.text}*/}
            {/*  </div>*/}
            {/*</CustomLink>*/}
          </div>
          {/* Media section */}
          <div className="sm:9/12 max-h-full w-full lg:w-4/12">
            {/* Images */}
            {feature.media.mime.startsWith('image') && (
              <div className="h-auto w-full">image here</div>
            )}
            {/* Videos */}
            {feature.media.mime.startsWith('video') && (
              // <Video
              //   media={feature.media}
              //   className="w-full h-auto"
              //   autoPlay
              //   controls={false}
              // />
              <div>video here</div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default FeatureRowsGroup
