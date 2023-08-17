import { ApexChart } from "../../components/ApexChart";

const randomizeArray = () => {
  const sparkLineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46];
  const array = sparkLineData.slice();
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

export const Sales = ({ title, subtitle, colors, ...rest }) => {
  const series = [{
    name: subtitle ?? 'Sales',
    data: randomizeArray(),
  }];

  const options = {
    chart: {
      type: 'area',
      sparkline: {
        enabled: true
      },
    },
    stroke: {
      curve: 'straight'
    },
    fill: {
      opacity: 1,
    },
    labels: [...Array(24).keys()].map(n => `2018-09-0${n + 1}`),
    yaxis: {
      show: false,
      min: 0,
    },
    xaxis: {
      type: 'datetime',
    },
    colors: colors ?? ['#DCE6EC'],
    title: {
      text: title ?? '',
      offsetX: 30,
      style: {
        fontSize: '24px',
        cssClass: 'apexcharts-yaxis-title'
      }
    },
    subtitle: {
      text: subtitle ?? '',
      offsetX: 30,
      style: {
        fontSize: '14px',
        cssClass: 'apexcharts-yaxis-title'
      }
    }
  };

  return (
    <ApexChart
      series={series}
      options={options}
      type="area"
      height={250}
    />
  );
};

export default Sales;
