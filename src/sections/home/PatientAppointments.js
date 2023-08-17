import { ApexChart } from "../../components/ApexChart";
import { PatientAppointmentsData } from "../../mocks/PatientAppointments";

export const PatientAppointments = () => {
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
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent',],
    },
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",],
    },
    yaxis: {
      title: {
        text: 'Statuses',
      },
    },
    fill: {
      opacity: 1,
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
      title="Patient Appointments"
      series={series}
      type="bar"
      options={options}
      height={550}
    />
  );
};

export default PatientAppointments;
