import ApexChart from "../../components/ApexChart";
import { PatientVisitsData } from "../../mocks/PatientVisits";

export const PatientVisits = () => {
  const series = [
    {
      name: "Male",
      data: Object.keys(PatientVisitsData).map((d) => PatientVisitsData[d].male),
    },
    {
      name: "Female",
      data: Object.keys(PatientVisitsData).map((d) => PatientVisitsData[d].female),
    },
  ];

  const options = {
    chart: {
      type: "bar",
    },
    colors: ["#63ABFD", "#E697FF"],
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: "top"
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"]
    },
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu",],
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} patients`
      }
    }
  };

  return (
    <ApexChart
      title="Patient Visits"
      series={series}
      type="bar"
      options={options}
      height={400}
    />
  );
};

export default PatientVisits;
