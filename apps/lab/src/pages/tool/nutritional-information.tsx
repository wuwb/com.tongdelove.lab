import axios from "axios"
import { useState } from "react"
import { trpc } from '@/utils/trpc'

export const NutritionalInformation = () => {

  const { data = [] } = trpc.sticker.listHomePage.useQuery({
    page: 1,
    take: 15,
  })

  const [nutritionalInformation, setNutritionalInformation] = useState<any>(null)

  const handleClick = async () => {
    const data = await axios.request({
      url: 'https://www.phsciencedata.cn/Share/searchDetailInformation/',
      data: {
        code1: '11201',
      },
      method: 'POST',
    })
    console.log('data: ', data)
    setNutritionalInformation(data)
  }


  return (
    <div>
      <h1>Nutritional Information</h1>
      <div onClick={handleClick}>获取营养成分</div>
      {nutritionalInformation}
    </div>
  )
}

export default NutritionalInformation
