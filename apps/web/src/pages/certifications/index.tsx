import Layout from '@/components/common/Layout';

const Home = () => (
  <div>
    <div>
      <div>资质证书</div>
      <div>
        <div>
          <div>Material</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-slate-300 rounded">
              <div></div>
              <div>FSC 100%</div>
              <div>
                Indicates paper pulp is made of 100% virgin material from
                FSC-certified forests.
              </div>
            </div>
            <div className="p-5 bg-slate-300 rounded">
              <div></div>
              <div>FSC 100%</div>
              <div>
                Indicates paper pulp is made of 100% virgin material from
                FSC-certified forests.
              </div>
            </div>
            <div className="p-5 bg-slate-300 rounded">
              <div>FSC Mix</div>
              <div>
                Indicates that the pulp is a mix of FSC certified forests,
                recycled pulp, and controlled wood, or wood from ethical
                sources that does not meet the full FSC certification.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>国内认证</div>
    <div>国外认证</div>
  </div>
);

Home.Layout = Layout;

export default Home;
