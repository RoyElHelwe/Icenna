import { Box, Card, CardContent, CardHeader } from "@mui/material";
import ReactApexChart from "react-apexcharts";

export const ApexChart = ({ title, children, ...rest }) => {
  const defaultOptions = {
    chart: {
      width: 300,
    },
    dataLabels: {
      enabled: false,
    },
    noData: {
      text: 'No data',
    },
  };

  return (
    <Card sx={{ m: 2, height: '100%', width: '100%' }} elevation={3}>
      <CardHeader title={title} sx={{ textAlign: "center", mt: 5, }} />
      <CardContent>
        {children}
        <Box sx={{ p: 3, pb: 1 }}>
          <ReactApexChart
            series={[]}
            options={defaultOptions}
            type="bar"
            height={300}
            {...rest}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ApexChart;
