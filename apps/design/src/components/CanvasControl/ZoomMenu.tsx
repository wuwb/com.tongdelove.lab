export const ZoomMenu = (props) => {
  const { handleZoom } = props
  return (
    <div style={{
      position: 'absolute',
      bottom: '35px',
      left: 0,
      width: '100%',
      height: '260px',
      display: 'none',
      borderRadius: '4px',
      boxShadow: '0 2px 5px 0 rgb(0 0 0 / 4%)',
      transition: 'display 0.2s linear',
    }}>
      <div className="" style={{
        width: '126px',
        lineHeight: '36px',
        fontSize: '12px',
        textAlign: 'center',
        backgroundColor: '#fff',
        cursor: 'pointer',
        transition: 'all 0.2s linear',
      }} onClick={() => handleZoom(0.2)}>
        20%
      </div>
      <div className="" style={{
        width: '126px',
        lineHeight: '36px',
        fontSize: '12px',
        textAlign: 'center',
        backgroundColor: '#fff',
        cursor: 'pointer',
        transition: 'all 0.2s linear',
      }} onClick={() => handleZoom(0.5)}>
        50%
      </div>
      <div className="" style={{
        width: '126px',
        lineHeight: '36px',
        fontSize: '12px',
        textAlign: 'center',
        backgroundColor: '#fff',
        cursor: 'pointer',
        transition: 'all 0.2s linear',
      }} onClick={() => handleZoom(1)}>
        100%
      </div>
      <div className="" style={{
        width: '126px',
        lineHeight: '36px',
        fontSize: '12px',
        textAlign: 'center',
        backgroundColor: '#fff',
        cursor: 'pointer',
        transition: 'all 0.2s linear',
      }} onClick={() => handleZoom(2)}>
        200%
      </div>
      <div className="" style={{
        width: '126px',
        lineHeight: '36px',
        fontSize: '12px',
        textAlign: 'center',
        backgroundColor: '#fff',
        cursor: 'pointer',
        transition: 'all 0.2s linear',
      }} onClick={() => handleZoom(3)}>
        300%
      </div>
      <div className="" style={{
        width: '126px',
        lineHeight: '36px',
        fontSize: '12px',
        textAlign: 'center',
        backgroundColor: '#fff',
        cursor: 'pointer',
        transition: 'all 0.2s linear',
      }} onClick={() => handleZoom(-1)}>
        适应屏幕
      </div>
      <div className="" style={{
        width: '126px',
        lineHeight: '36px',
        fontSize: '12px',
        textAlign: 'center',
        backgroundColor: '#fff',
        cursor: 'pointer',
        transition: 'all 0.2s linear',
      }} onClick={() => handleZoom(0)}>
        实际大小
      </div>
    </div>
  )
}
