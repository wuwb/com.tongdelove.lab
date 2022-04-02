import Head from 'next/head';
import { Grid } from "@mui/material";
import BlogCard from "@/components/dashboard/BlogCard";
import DailyActivity from "@/components/dashboard/DailyActivity";
import ProductPerfomance from "@/components/dashboard/ProductPerfomance";
import FullLayout from "@/components/layouts/FullLayout/FullLayout";

function DashboardIndex() {
  return (
    <>
      <Head>
        <title>Analytics Dashboard</title>
      </Head>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={4}>
          <DailyActivity />
        </Grid>
        <Grid item xs={12} lg={8}>
          <ProductPerfomance />
        </Grid>
        <Grid item xs={12} lg={12}>
          <BlogCard />
        </Grid>
      </Grid>
    </>
  );
}

DashboardIndex.getLayout = (page) => (
  // <Authenticated>
    <FullLayout>{page}</FullLayout>
  // </Authenticated>
);

export default DashboardIndex;
