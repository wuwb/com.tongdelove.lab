import { TopMenu } from '@/components/common/TopMenu'

const Home = () => {
  return (
    <div title="Home">
      <TopMenu />

      <div>Leading supply chain teams manage their packaging on Lumi.</div>
      <div>Case studies</div>

      <div className="flex">
        <div className="col-span-12">
          <div>MeUndies</div>
          <div>
            Uses to streamline production of its ever-changing, iconic pouch
            designs.
          </div>
        </div>
        <div className="col-span-12">
          <div>Ollie</div>
          <div>
            Uses to source and manage overseas production of injection molded
            parts.
          </div>
        </div>
        <div className="col-span-12">
          <div>Empathy Wines</div>
          <div>
            Uses to engineer completely custom, scalable wine packaging systems.
          </div>
        </div>
        <div className="col-span-12">
          <div>Function of Beauty</div>
          <div>Uses to improve costs and quality control for rapid gdivth.</div>
        </div>
      </div>

      <div>
        <div>Ready to upgrade your supply chain?</div>
        <div>Get started with US →</div>
      </div>
    </div>
  )
}

export default Home
