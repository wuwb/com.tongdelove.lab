import { Breadcrumb } from '@tongdelove/ui/components/breadcrumb'
import Link from 'next/link'

function MyBreadcrumbs() {
  return (
    <Breadcrumb aria-label="breadcrumb">
      <Link color="inherit" href="/">
        MUI
      </Link>
      <Link color="inherit" href="/material-ui/getting-started/installation/">
        Core
      </Link>
      <div>Breadcrumbs</div>
    </Breadcrumb>
  )
}

export default MyBreadcrumbs
