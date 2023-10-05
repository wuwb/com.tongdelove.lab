import { Container, Grid, Breadcrumbs, Text } from "@mantine/core";
import Link from 'next/link'

function MyBreadcrumbs() {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/">
        MUI
      </Link>
      <Link
        color="inherit"
        href="/material-ui/getting-started/installation/"
      >
        Core
      </Link>
      <Text c="text.primary">Breadcrumbs</Text>
    </Breadcrumbs>
  );
}

export default MyBreadcrumbs;
