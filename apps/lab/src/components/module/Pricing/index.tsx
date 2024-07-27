type IPricingProps = any

export const Pricing = (props: IPricingProps) => {
  const pricing = {
    title: 'Pricing',
    items: [
      {
        name: 'Free',
        price: '$0',
        priceDetails: 'for one user',
        features: [
          '1 user',
          'Basic Support',
          '1 GB of storage',
          'Email support',
        ],
      },
      {
        name: 'Pro',
        price: '$15',
        priceDetails: 'per user',

        features: [
          '5 users',
          'Priority Support',
          '10 GB of storage',
          'Phone and Email support',
        ],
      },
      {
        name: 'Enterprise',
        price: '$29',
        priceDetails: 'per user',
        features: [
          '50 users',
          '24/7 Support',
          '100 GB of storage',
          'Phone and Email support',
        ],
      },
    ],
  }
  const { items, title } = pricing
  const [firstPlan, secondPlan, thirdPlan] = items

  return (
    <section className={`py-8`} id="pricing">
      <div className="container mx-auto px-2 pb-12 pt-4 text-primary">
        <h1 className="my-2 w-full text-center text-5xl font-bold leading-tight text-primary">
          {title}
        </h1>
        <div className="mb-4 w-full">
          <div className="mx-auto my-0 h-1 w-64 rounded-t bg-primary py-0 opacity-25"></div>
        </div>
        <div className="my-12 flex flex-col justify-center pt-12 sm:my-4 sm:flex-row">
          <div className="mx-auto mt-4 flex w-5/6 flex-col rounded-none lg:mx-0 lg:w-1/4 lg:rounded-l-lg">
            <div className="flex-1 overflow-hidden rounded-b-none rounded-t text-gray-600 shadow">
              <div className="border-b-4 p-8 text-center text-3xl font-bold">
                {firstPlan?.name}
              </div>
              <ul className="w-full text-center text-sm">
                {firstPlan?.features.map((feature) => (
                  <li
                    className="border-b py-4"
                    key={`${firstPlan.name}-${feature}`}
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto flex-none overflow-hidden rounded-b rounded-t-none p-6 shadow">
              <div className="w-full pt-6 text-center text-3xl font-bold text-gray-600">
                {firstPlan?.price}
                <span className="text-base"> {firstPlan?.priceDetails}</span>
              </div>
            </div>
          </div>
          <div className="z-10 mx-auto mt-4 flex w-5/6 flex-col rounded-lg shadow-lg sm:-mt-6 lg:mx-0 lg:w-1/3">
            <div className="flex-1 overflow-hidden rounded-b-none rounded-t shadow">
              <div className="w-full p-8 text-center text-3xl font-bold">
                {secondPlan?.name}
              </div>
              <div className="my-0 h-1 w-full rounded-t bg-primary py-0"></div>
              <ul className="w-full text-center text-base font-bold">
                {secondPlan?.features.map((feature) => (
                  <li
                    className="border-b py-4"
                    key={`${secondPlan?.name}-${feature}`}
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto flex-none overflow-hidden rounded-b rounded-t-none p-6 shadow">
              <div className="w-full pt-6 text-center text-4xl font-bold">
                {secondPlan?.price}
                <span className="text-base"> {secondPlan?.priceDetails}</span>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-4 flex w-5/6 flex-col rounded-none bg-primary lg:mx-0 lg:w-1/4 lg:rounded-l-lg">
            <div className="flex-1 overflow-hidden rounded-b-none rounded-t text-gray-600 shadow">
              <div className="border-b-4 p-8 text-center text-3xl font-bold">
                {thirdPlan?.name}
              </div>
              <ul className="w-full text-center text-sm">
                {thirdPlan?.features.map((feature) => (
                  <li
                    className="border-b py-4"
                    key={`${thirdPlan?.name}-${feature}`}
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto flex-none overflow-hidden rounded-b rounded-t-none p-6 shadow">
              <div className="w-full pt-6 text-center text-3xl font-bold text-gray-600">
                {thirdPlan?.price}
                <span className="text-base"> {thirdPlan?.priceDetails}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
