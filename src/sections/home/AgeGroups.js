import { useTheme } from "@mui/material";
import ApexChart from "../../components/ApexChart";
import { AgeGroupsData } from "../../mocks/AgeGroups";

export const AgeGroups = () => {
  const globalTheme = useTheme();

  const series = Object.keys(AgeGroupsData).map((i) => AgeGroupsData[i].value);

  const options = {
    chart: {
      type: "polarArea",
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
    labels: Object.keys(AgeGroupsData).map((i) => AgeGroupsData[i].name),
    tooltip: {
      y: {
        formatter: (val) => `${val} patients`,
      },
    },
  };

  return (
    <ApexChart
      title="No. of patients by age group"
      series={series}
      options={options}
      type="polarArea"
    />
  );
};

export default AgeGroups;
