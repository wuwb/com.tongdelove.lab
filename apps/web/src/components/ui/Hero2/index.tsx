import Markdown from 'react-markdown'

export const Hero = ({ data }) => {
  return (
    <main className="container flex flex-col items-center justify-between py-12 md:flex-row">
      {/* Left column for content */}
      <div className="flex-1 sm:pr-8">
        {/* Hero section label */}
        <p className="font-semibold uppercase tracking-wide">{data.label}</p>
        {/* Big title */}
        <h1 className="title mb-4 mt-2 sm:mb-2 sm:mt-0">{data.title}</h1>
        {/* Description paragraph */}
        <p className="mb-6 text-xl">{data.description}</p>
        {/* Buttons row */}
        <div className="flex flex-row flex-wrap gap-4">
          {data.buttons.map((button, index) => (
            // <ButtonLink
            //   button={button}
            //   appearance={getButtonAppearance(button.type, "light")}
            //   key={button.id}
            // />
            <div key={index}>button</div>
          ))}
        </div>
        {/* Small rich text */}
        <div className="rich-text-hero mt-4 text-base sm:mt-3 md:text-sm">
          <Markdown>{data.smallTextWithLink}</Markdown>
        </div>
      </div>
      {/* Right column for the image */}
      <div className="mt-6 w-full flex-shrink-0 md:mt-0 md:w-6/12">
        image here
      </div>
    </main>
  )
}
