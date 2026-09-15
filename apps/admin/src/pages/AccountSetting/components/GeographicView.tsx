import { useRequest } from '@umijs/max'
import { Select, Spin } from 'antd'
import { LabeledValue } from 'antd/es/select'
import { useEffect } from 'react'
import { GeographicItemType } from '../data.d'
import { queryCity, queryProvince } from '../service'
import styles from './GeographicView.less'

const { Option } = Select

const nullSelectItem: LabeledValue = {
  label: '',
  value: '',
  key: '',
}

// 后端返回可能是数组，也可能是 { data: [] } 之类的包装结构
const normalizeList = (data: any): GeographicItemType[] => {
  if (Array.isArray(data)) {
    return data
  }
  if (Array.isArray(data?.data)) {
    return data.data
  }
  if (Array.isArray(data?.list)) {
    return data.list
  }
  return []
}

interface GeographicViewProps {
  value?: {
    province: LabeledValue
    city: LabeledValue
  }
  onChange?: (value: { province: LabeledValue; city: LabeledValue }) => void
}

const GeographicView = ({ value, onChange }: GeographicViewProps) => {
  const { data: provinceData, loading: provinceLoading } =
    useRequest(queryProvince)
  const {
    data: cityData,
    loading: cityLoading,
    run: fetchCity,
  } = useRequest(queryCity, {
    manual: true,
  })

  const provinceKey = value?.province?.key

  useEffect(() => {
    if (provinceKey) {
      fetchCity(provinceKey)
    }
  }, [provinceKey, fetchCity])

  const getOption = (list: GeographicItemType[]) => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      )
    }
    return list.map((item) => (
      <Option key={item.id} value={item.id}>
        {item.name}
      </Option>
    ))
  }

  const selectProvinceItem = (item: LabeledValue) => {
    if (item.key) {
      fetchCity(item.key)
    }
    onChange?.({
      province: item,
      city: nullSelectItem,
    })
  }

  const selectCityItem = (item: LabeledValue) => {
    onChange?.({
      province: value?.province || nullSelectItem,
      city: item,
    })
  }

  return (
    <Spin
      spinning={provinceLoading || cityLoading}
      wrapperClassName={styles.row}
    >
      <Select
        className={styles.item}
        value={value?.province || nullSelectItem}
        labelInValue
        showSearch
        onSelect={selectProvinceItem}
      >
        {getOption(normalizeList(provinceData))}
      </Select>
      <Select
        className={styles.item}
        value={value?.city || nullSelectItem}
        labelInValue
        showSearch
        onSelect={selectCityItem}
      >
        {getOption(normalizeList(cityData))}
      </Select>
    </Spin>
  )
}

export default GeographicView
