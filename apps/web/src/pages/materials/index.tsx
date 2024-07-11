import styled from '@emotion/styled';
import Image from 'next/image';
import { Layout } from '@/components/common';

const StyledMaterialsItem = styled.div`
  float: left;
  width: 200px;
  height: 200px;
  margin-right: 10px;
  overflow: hidden;
  background-color: #f7f6f5;
  border-radius: 8px;
  transition: all 0.1s linear;
`;

const Page = () => {
  return (
    <div>
      <div className="container">
        <div>
          <h1>
            材料<span>Materials</span>
          </h1>
        </div>
        <div className="section">
          <div>
            <h3>
              纸<span>Paper</span>
            </h3>
            <p>多层纸板，由波纹状的瓦楞纸制成，粘贴在纸片之间。</p>
          </div>
          <div>
            <StyledMaterialsItem>
              <div className={'image-wrap'}>
                <Image width={100} height={100} className={'image'} src="https://placehold.it/100x100" alt="" />
              </div>
              <div className="title">天然牛皮纸板</div>
              <div className="desc">未涂层的天然牛皮纸表面。</div>
            </StyledMaterialsItem>
            <StyledMaterialsItem>
              <div>查看所有</div>
            </StyledMaterialsItem>
          </div>
        </div>
        <div className="section">
          <div>
            <h3>
              卡纸<span>Paperboard</span>
            </h3>
            <p>多层纸板，由波纹状的瓦楞纸制成，粘贴在纸片之间。</p>
          </div>
          <div>
            <div>
              <div>
              <Image width={100} height={100} src="https://placehold.it/100x100" alt="" />
              </div>
              <div>天然牛皮纸板</div>
              <div>未涂层的天然牛皮纸表面。</div>
            </div>
          </div>
        </div>
        <div className="section">
          <div>
            <h3>
              瓦楞纸板 <span>Corrugated Board</span>
            </h3>
            <p>多层纸板，由波纹状的瓦楞纸制成，粘贴在纸片之间。</p>
          </div>
          <div>
            <div>
              <div>
              <Image width={100} height={100} src="https://placehold.it/100x100" alt="" />
              </div>
              <div>天然牛皮纸板</div>
              <div>未涂层的天然牛皮纸表面。</div>
            </div>
            <div>
              <div>Natural Kraft Board</div>
              <div>Uncoated natural kraft surface.</div>
            </div>
          </div>
        </div>
        <div className="section">
          <div>
            <h3>
              塑料薄膜 <span>Films</span>
            </h3>
            <p>多层纸板，由波纹状的瓦楞纸制成，粘贴在纸片之间。</p>
          </div>
          <div>
            <div>
              <div>
              <Image width={100} height={100} src="https://placehold.it/100x100" alt="" />
              </div>
              <div>天然牛皮纸板</div>
              <div>未涂层的天然牛皮纸表面。</div>
            </div>
          </div>
        </div>
        <div className="section">
          <div>
            <h3>
              金属薄膜 <span>Laminates</span>
            </h3>
            <p>多层纸板，由波纹状的瓦楞纸制成，粘贴在纸片之间。</p>
          </div>
          <div>
            <div>
              <div>
              <Image width={100} height={100} src="https://placehold.it/100x100" alt="" />
              </div>
              <div>天然牛皮纸板</div>
              <div>未涂层的天然牛皮纸表面。</div>
            </div>
          </div>
        </div>
        <div className="section">
          <div>
            <h3>
              无纺布 <span>Fabric</span>
            </h3>
            <p>用于裁剪和缝制产品，并提供多种颜色和品质。</p>
          </div>
          <div>
            <div>
              <div>
              <Image width={100} height={100} src="https://placehold.it/100x100" alt="" />
              </div>
              <div>天然牛皮纸板</div>
              <div>未涂层的天然牛皮纸表面。</div>
            </div>
          </div>
        </div>
        <div className="section">
          <div>
            <h3>
              填充材料 <span>Insulation</span>
            </h3>
            <p>用于裁剪和缝制产品，并提供多种颜色和品质。</p>
          </div>
          <div>
            <div>
              <div>
              <Image width={100} height={100} src="https://placehold.it/100x100" alt="" />
              </div>
              <div>天然牛皮纸板</div>
              <div>未涂层的天然牛皮纸表面。</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Page.Layout = Layout;

export default Page;
