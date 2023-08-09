import { Card, CardContent, CardHeader } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { useSettings } from '../hooks/useSettings';

export const ApexChart = ({ title, children, options, ...rest }) => {
  const { settings } = useSettings();
  const { mode } = settings;

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
    theme: {
      mode: mode ?? 'light',
      palette: 'palette1',
      monochrome: {
        enabled: false,
        color: '#255aee',
        shadeTo: mode ?? 'light',
        shadeIntensity: 0.65,
      },
    },
  };

  return (
    <Card sx={{ m: 2, height: '100%', width: '100%' }} elevation={3}>
      <CardHeader title={title} sx={{ textAlign: "center", mt: 5, }} />
      <CardContent>
        {children}
        <ReactApexChart
          series={[]}
          options={{
            ...defaultOptions,
            ...options,
          }}
          type="bar"
          height={300}
          {...rest}
        />
      </CardContent>
    </Card>
  );
};

export default ApexChart;
