import Image from 'next/image'
import styled from '@emotion/styled'

const StyledBelt = styled.div`
  width: 200px;
`

const Belt = props => {
  const { name, image, industry = '包装', description } = props
  return (
    <StyledBelt>
      <Image width={200} height={200} src={image} alt={name} />
      <div className="caption">
        <h3>{name}</h3>
        <div className="industry">{industry}</div>
        <div className="description">{description}</div>
      </div>
    </StyledBelt>
  )
}
export default Belt
