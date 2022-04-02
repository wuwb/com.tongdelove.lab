import styled from "@emotion/styled";

const StyledZoomMenu = styled.div`
  position: absolute;
  bottom: 35px;
  left: 0;
  width: 100%;
  height: 260px;
  display: none;
  border-radius: 4px;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 4%);
  transition: display .2s linear;
`;

const StyledZoomMenuItem = styled.div`
  width: 126px;
  line-height: 36px;
  font-size: 12px;
  text-align: center;
  background-color: #fff;
  cursor: pointer;
  transition: all .2s linear;
`;

const ZoomMenu = (props) => {
  const { handleZoom } = props;
  return (
    <StyledZoomMenu>
      <StyledZoomMenuItem onClick={() => handleZoom(0.2)}>20%</StyledZoomMenuItem>
      <StyledZoomMenuItem onClick={() => handleZoom(0.5)}>50%</StyledZoomMenuItem>
      <StyledZoomMenuItem onClick={() => handleZoom(1)}>100%</StyledZoomMenuItem>
      <StyledZoomMenuItem onClick={() => handleZoom(2)}>200%</StyledZoomMenuItem>
      <StyledZoomMenuItem onClick={() => handleZoom(3)}>300%</StyledZoomMenuItem>
      <StyledZoomMenuItem onClick={() => handleZoom(-1)}>适应屏幕</StyledZoomMenuItem>
      <StyledZoomMenuItem onClick={() => handleZoom(0)}>实际大小</StyledZoomMenuItem>
    </StyledZoomMenu>
  );
};

export default ZoomMenu;
