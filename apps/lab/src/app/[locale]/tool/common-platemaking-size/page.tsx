import { Card } from '@tongdelove/ui/components/card'

function CommonPlatemakingSizeTool() {
  return (
    <div className="box max-w-screen-3xl container mx-auto w-full max-w-[1680px]">
      <div className="flex flex-col justify-between gap-2">
        <h1>常用制版尺寸表（单位：cm）</h1>
        <Card>
          <table style={{ border: '0' }} cellPadding="0" cellSpacing="0">
            <tbody>
              <tr>
                <th style={{ width: '102' }} rowSpan={2}>
                  开度\规格
                </th>
                <th colSpan={2}>正度</th>
                <th colSpan={2}>大度</th>
              </tr>
              <tr>
                <th style={{ width: '124' }}>纸张规格</th>
                <th style={{ width: '139' }}>制版规格</th>
                <th style={{ width: '162' }}>纸张规格</th>
                <th style={{ width: '142' }}>制版规格</th>
              </tr>
              <tr>
                <td>全张</td>
                <td>109.2 × 78.7 </td>
                <td>108 × 76 </td>
                <td>119.4 × 88.9 </td>
                <td>118 × 86 </td>
              </tr>
              <tr>
                <td style={{ backgroundColor: '#EBEBEB' }}>对开</td>
                <td style={{ backgroundColor: '#EBEBEB' }}>54.5 × 78.7 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}>53 × 76 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}>59.7 × 88.9 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}>58 × 86 </td>
              </tr>
              <tr>
                <td rowSpan={2}>3开</td>
                <td>36.2 × 78.7 </td>
                <td>34.5 × 76 </td>
                <td>39.7 × 88.9 </td>
                <td>38 × 86 </td>
              </tr>
              <tr>
                <td>39 × 70 </td>
                <td>37.5 × 69 </td>
                <td>44.4 × 75 </td>
                <td>42 × 74 </td>
              </tr>
              <tr>
                <td rowSpan={2} style={{ backgroundColor: '#EBEBEB' }}>
                  4开
                </td>
                <td style={{ backgroundColor: '#EBEBEB' }}>39.2 × 54.5 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}>38 × 53 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}>44.4 × 59.7 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}>42 × 58 </td>
              </tr>
              <tr>
                <td style={{ backgroundColor: '#EBEBEB' }}>27.2 × 78.5</td>
                <td style={{ backgroundColor: '#EBEBEB' }}>26 × 76</td>
                <td style={{ backgroundColor: '#EBEBEB' }}>29.8 × 88.5</td>
                <td style={{ backgroundColor: '#EBEBEB' }}>28 × 86</td>
              </tr>
              <tr>
                <td rowSpan={2}>6开</td>
                <td> 36.2 × 39.2 </td>
                <td> 34.5 × 37.5 </td>
                <td> 39.7 × 44.4 </td>
                <td> 38 × 42 </td>
              </tr>
              <tr>
                <td> 26.2 × 54.5 </td>
                <td> 24.5 × 53 </td>
                <td> 29.6 × 59.7 </td>
                <td> 28.5 × 58 </td>
              </tr>
              <tr>
                <td rowSpan={2} style={{ backgroundColor: '#EBEBEB' }}>
                  8开
                </td>
                <td style={{ backgroundColor: '#EBEBEB' }}> 27.2 × 39.2 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}> 26 × 38 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}> 29.8 × 44.4 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}> 28.5 × 42 </td>
              </tr>
              <tr>
                <td style={{ backgroundColor: '#EBEBEB' }}> 19.6 × 54.5 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}> 18 × 53 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}> 22.2 × 59.7 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}> 21 × 57 </td>
              </tr>
              <tr>
                <td>9开</td>
                <td> 26.2 × 36.2 </td>
                <td> 25 × 34.5 </td>
                <td> 29.6 × 39.7 </td>
                <td> 28 × 38 </td>
              </tr>
              <tr>
                <td rowSpan={2} style={{ backgroundColor: '#EBEBEB' }}>
                  10开
                </td>
                <td style={{ backgroundColor: '#EBEBEB' }}> 21.8 × 39.2 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}> 20.5 × 38 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}> 23.8 × 44.4 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}> 22.5 × 42 </td>
              </tr>
              <tr>
                <td style={{ backgroundColor: '#EBEBEB' }}> 15.7 × 54.5 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}> 14.5 × 53 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}> 17.7 × 59.7 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}> 16.5 × 58 </td>
              </tr>
              <tr>
                <td rowSpan={4}>12开</td>
                <td> 26.2 × 27.2 </td>
                <td> 25 × 26 </td>
                <td> 29.6 × 29.8 </td>
                <td> 28.5 × 28.5 </td>
              </tr>
              <tr>
                <td>19.6 × 36.2 </td>
                <td>18 × 35 </td>
                <td>22.2 × 39.7 </td>
                <td>21 × 38 </td>
              </tr>
              <tr>
                <td>18 × 39.2 </td>
                <td>17 × 38 </td>
                <td>19.8 × 44.4 </td>
                <td>18.5 × 42 </td>
              </tr>
              <tr>
                <td>13.1 × 54.5 </td>
                <td>12 × 53 </td>
                <td>14.8 × 59.7 </td>
                <td>13 × 58 </td>
              </tr>
              <tr>
                <td rowSpan={2} style={{ backgroundColor: '#EBEBEB' }}>
                  16开
                </td>
                <td style={{ backgroundColor: '#EBEBEB' }}>19.6 × 27.2 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}>18.5 × 26 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}>22.2 × 29.8 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}>21 × 28.5 </td>
              </tr>
              <tr>
                <td style={{ backgroundColor: '#EBEBEB' }}>13.6 × 39.2 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}>12.5 × 38 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}>14.8 × 44.4 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}>14 × 42 </td>
              </tr>
              <tr>
                <td rowSpan={2}>18开</td>
                <td>18 × 26.2 </td>
                <td>17 × 25 </td>
                <td>19.8 × 29.6 </td>
                <td>18.5 × 28.5 </td>
              </tr>
              <tr>
                <td>13 × 36.2 </td>
                <td>12 × 35 </td>
                <td>14.7 × 39.7 </td>
                <td>13.5 × 38 </td>
              </tr>
              <tr>
                <td rowSpan={2} style={{ backgroundColor: '#EBEBEB' }}>
                  20开
                </td>
                <td style={{ backgroundColor: '#EBEBEB' }}>19.6 × 21.8 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}>18.5 × 20.5 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}>22.2 × 23.8 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}>21 × 22.5 </td>
              </tr>
              <tr>
                <td style={{ backgroundColor: '#EBEBEB' }}>15.7 × 27.2 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}>14.5 × 26 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}>17.7 × 29.8 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}>16.5 × 28.5 </td>
              </tr>
              <tr>
                <td rowSpan={4}>24开</td>
                <td> 18 × 19.6 </td>
                <td> 17 × 18.5 </td>
                <td> 19.8 × 22.2 </td>
                <td> 18.5 × 21 </td>
              </tr>
              <tr>
                <td> 131.× 27.2 </td>
                <td> 12 × 26 </td>
                <td> 14.8 × 29.8 </td>
                <td> 13.5 × 28.5 </td>
              </tr>
              <tr>
                <td> 13.6 × 26.2 </td>
                <td> 12.5 × 25 </td>
                <td> 14.9 × 29.6 </td>
                <td> 13.5 × 28.5 </td>
              </tr>
              <tr>
                <td> 9.8 × 36.2 </td>
                <td> 8.5 × 34 </td>
                <td> 11.1 × 29.7 </td>
                <td> 10 × 38 </td>
              </tr>
              <tr>
                <td rowSpan={2} style={{ backgroundColor: '#EBEBEB' }}>
                  32开
                </td>
                <td style={{ backgroundColor: '#EBEBEB' }}> 13.6 × 19.6 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}> 12.5 × 18.5 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}> 14.8 × 22.2 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}> 14 × 21 </td>
              </tr>
              <tr>
                <td style={{ backgroundColor: '#EBEBEB' }}> 9.8 × 27.2 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}> 8.5 × 26 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}> 11.1 × 29.8 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}> 10 × 28.5 </td>
              </tr>
              <tr>
                <td rowSpan={4}>40开</td>
                <td> 13.6 × 15.7 </td>
                <td> 12.5 × 14.5 </td>
                <td> 14.9 × 17.7 </td>
                <td> 13.5 × 16.5 </td>
              </tr>
              <tr>
                <td> 9.8 × 21.8 </td>
                <td> 8.5 × 20.5 </td>
                <td> 11.1 × 23.8 </td>
                <td> 10 × 22.5 </td>
              </tr>
              <tr>
                <td> 10.9 × 19.6 </td>
                <td> 10 × 18.5 </td>
                <td> 11.9 × 22.2 </td>
                <td> 10.5 × 21 </td>
              </tr>
              <tr>
                <td> 7.8 × 27.2 </td>
                <td> 7 × 26 </td>
                <td> 8.8 × 29.8 </td>
                <td> 7 × 26 </td>
              </tr>
              <tr>
                <td rowSpan={2} style={{ backgroundColor: '#EBEBEB' }}>
                  48开
                </td>
                <td style={{ backgroundColor: '#EBEBEB' }}>13.6 × 13 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}>12.5 × 12 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}>14.8 × 14.9 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}>13.5 × 13.5 </td>
              </tr>
              <tr>
                <td style={{ backgroundColor: '#EBEBEB' }}>18 × 9.8 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}>17 × 9 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}>11.1 × 19.8 </td>
                <td style={{ backgroundColor: '#EBEBEB' }}>10 × 19 </td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  )
}

export default CommonPlatemakingSizeTool
