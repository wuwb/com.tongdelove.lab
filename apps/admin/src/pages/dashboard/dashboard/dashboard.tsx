import { AccentSidebarLayout } from '@/components/layouts'

function Dashboard() {
  return <div>dashboard</div>
}

Dashboard.getLayout = (page) => (
  // <Authenticated>
  <AccentSidebarLayout>{page}</AccentSidebarLayout>
  // </Authenticated>
)

export default Dashboard
