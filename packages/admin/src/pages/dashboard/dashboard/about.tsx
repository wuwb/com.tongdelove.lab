import * as React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { AccentSidebarLayout, FullLayout } from '@/components/layouts';

function AboutPage() {
  return (
    <FullLayout>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <Card>
            <CardContent>
              <Typography variant="h4">About Card</Typography>
              <Typography variant="body1">
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </FullLayout>
  );
}

AboutPage.getLayout = (page) => (
  // <Authenticated>
  <AccentSidebarLayout>{page}</AccentSidebarLayout>
  // </Authenticated>
);

export default AboutPage;
