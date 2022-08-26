import { Grid } from "@mui/material";
import ProductPerfomance from "@/components/dashboard/ProductPerfomance";
import { FullLayout, AccentSidebarLayout } from "@/components/layouts";

const Tables = () => {
  return (
    <FullLayout>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <ProductPerfomance />
        </Grid>
      </Grid>
    </FullLayout>
  );
};

Tables.getLayout = (page) => (
  // <Authenticated>
  <AccentSidebarLayout>{page}</AccentSidebarLayout>
  // </Authenticated>
);

export default Tables;
