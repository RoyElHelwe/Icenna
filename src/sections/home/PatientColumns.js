import { ApexChart } from "../../components/ApexChart";
import { PatientAppointmentsData } from "../../mocks/PatientAppointments";

export const PatientColumns = () => {
  const series = [
    {
      name: "Opened",
      data: Object.keys(PatientAppointmentsData).map((d) => PatientAppointmentsData[d].opened),
    },
    {
      name: "Confirmed",
      data: Object.keys(PatientAppointmentsData).map((d) => PatientAppointmentsData[d].confirmed),
    },
    {
      name: "Checked In",
      data: Object.keys(PatientAppointmentsData).map((d) => PatientAppointmentsData[d].checkedIn),
    },
  ];

  const options = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: {
        show: true
      },
    },
    colors: ['#775DD0', '#008FFB', '#00E396',],
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }],
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          total: {
            enabled: true,
          }
        }
      },
    },
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",],
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " patients";
        },
      },
    },
  };

  return (
    <ApexChart
      title="Patients"
      series={series}
      type="bar"
      options={options}
      height={400}
    />
  );
};

export default PatientColumns;
