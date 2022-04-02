import { Grid } from "@mui/material";
import ProductPerfomance from "@/components/dashboard/ProductPerfomance";
import FullLayout from "@/components/common/Layout/FullLayout";

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

export default Tables;
