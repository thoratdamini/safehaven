import "chart.js/auto";
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';

// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Typography } from '@mui/material';

const MaleFemalePieChart = ({ users }) => {
  // ChartJS.register( ArcElement, Tooltip, Legend);
  // Calculate male and female counts
  const maleCount = users.filter(user => user.gender === 'Male').length;
  const femaleCount = users.filter(user => user.gender === 'Female').length;


  const data = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        data: [maleCount, femaleCount],
        backgroundColor: ['#222831', '#76ABAE'],
        // hoverBackgroundColor: ['#31363F', '#76ABBF'],
      },
    ],
  };

return (
  <div>
    <h2>Male vs Female Distribution</h2>
    <Pie data={data} />
  </div>
);
};

export default MaleFemalePieChart;
