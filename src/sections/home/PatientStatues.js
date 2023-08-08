import { useTheme } from "@mui/material";
import ApexChart from "../../components/ApexChart";

export const PatientStatues = () => {
  const globalTheme = useTheme();

  const series = [44, 55, 41, 17, 15];

  const options = {
    chart: {
      type: 'donut',
    },
    stroke: {
      colors: [globalTheme.palette.background.paper],
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    dataLabels: {
      enabled: false,
    },
    labels: ["Checked In", "Checked out", "Confirmed", "Opened", "Out"],
    tooltip: {
      y: {
        formatter: (val) => `${val} patients`,
      },
    },
  };

  return (
    <ApexChart
      title="Patient Statues"
      series={series}
      options={options}
      type="donut"
    />
  );
};

export default PatientStatues;
