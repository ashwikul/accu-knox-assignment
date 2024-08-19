import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ widgetDetails }) => {


  const chartData = {
    labels: widgetDetails?.data?.map((d) => `${d.status} (${d.count})`),
    datasets: [{
      label: 'My First Dataset',
      data: widgetDetails?.data?.map((d) => d.count),
      backgroundColor: widgetDetails?.backgroundColor,
      hoverOffset: 4
    }]
  };


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          pointStyle: 'rectRounded',
        },
      },
    },
  };

  const doughnutLabel = {
    id: 'doughnutLabel',
    afterDraw(chart, args, options) {
      const { ctx, data } = chart;
      const total = data.datasets[0].data.reduce((a, b) => parseInt(a) + parseInt(b), 0);
      ctx.save();
      ctx.font = 'bold 18px Roboto';
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
      ctx.fillText(total, centerX, centerY);
      ctx.font = ' 12px Roboto';
      ctx.fillText('Total', centerX, centerY + 15);
      ctx.restore();
    },
  };

  return <Doughnut data={chartData} options={options} plugins={[doughnutLabel]} />
}

export default DoughnutChart