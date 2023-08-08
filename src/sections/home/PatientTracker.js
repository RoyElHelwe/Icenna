import { Box, Typography } from "@mui/material";
import ApexChart from "../../components/ApexChart";

export const PatientTracker = () => {
  const series = [82];

  const options = {
    chart: {
      height: 350,
      type: "radialBar",
      offsetY: -10
    },
    colors: ["#29CC91"],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: "16px",
            color: undefined,
            offsetY: 120
          },
          value: {
            offsetY: 76,
            fontSize: "22px",
            color: undefined,
            formatter: function (val) {
              return val + "%";
            }
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91]
      }
    },
    stroke: {
      dashArray: 6,
    },
    labels: ["",],
  };

  return (
    <ApexChart
      title="Patient Tracker"
      series={series}
      options={options}
      type="radialBar"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          mx: 5,
          mb: 3
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            42
          </Typography>
          <Typography sx={{ m: 1, mb: 0.5 }}>Tickets</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            10
          </Typography>
          <Typography sx={{ m: 1, mb: 0.5 }}>Tickets left</Typography>
        </Box>
      </Box>
    </ApexChart>
  );
};

export default PatientTracker;
