import { Allotment } from 'allotment'
import 'allotment/dist/style.css'
import { useRouter } from 'next/router'

const MapCountryCodeLocationCode = () => {
  const router = useRouter()

  const countryData = {
    id: '1',
    code: 'cn',
    title: '中国',
    provinces: [
      {
        title: '浙江',
      },
      {
        title: '江苏',
      },
    ],
  }

  const cityData = [
    {
      id: '1',
      rank: '1',
      title: '杭州',
      thumbnailURL: '',
      description: '',
      overall: '',
      cost: '',
      internet: '',
      liked: '',
      safety: '',
      temperature: '',
      aqi: '',
      healthare: '',
      happiness: '',
      nightlife: '',
      freeWifiInCity: '',
      wikiURL: '',
      tags: [
        {
          title: '',
        },
      ],
      counties: [
        {
          id: '',
          rank: '1',
          title: '临安区',
          description: '',
          overall: '',
          cost: '',
          internet: '',
          liked: '',
          safety: '',
          aqi: '',
        },
      ],
    },
  ]

  return (
    <div className="flex h-full">
      <div className="flex-1 pl-2.5">
        <Allotment>
          <Allotment.Pane minSize={200} preferredSize={200}>
            <div className="text-black">
              {countryData.title}
              {countryData.provinces.map((province) => {
                return <div key={province.title}>{province.title}</div>
              })}
            </div>
          </Allotment.Pane>
          <Allotment.Pane minSize={200}>
            <div w="full" mr="0.625rem">
              {cityData.map((city) => {
                return (
                  <div className="border p-2.5">
                    <div>{city.title}</div>
                    <div className="flex border p-2.5">
                      {city.counties.map((county) => {
                        return <div>{county.title}</div>
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </Allotment.Pane>
        </Allotment>
      </div>
    </div>
  )
}

export default MapCountryCodeLocationCode
