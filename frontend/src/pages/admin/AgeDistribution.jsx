import "chart.js/auto";
import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Typography } from '@mui/material';

const AgeDistribution = ({ users }) => {
  // ChartJS.register( ArcElement, Tooltip, Legend);
  // Calculate male and female counts
  const ageRanges = ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61+'];

  // Initialize counts for each age range
  const ageRangeCounts = Array(ageRanges.length).fill(0);

  // Group users by age range
  users.forEach(user => {
    const age = user.age;
    if (age < 11) {
      ageRangeCounts[0]++;
    } else if (age < 21) {
      ageRangeCounts[1]++;
    } else if (age < 31) {
      ageRangeCounts[2]++;
    } else if (age < 41) {
      ageRangeCounts[3]++;
    } else if (age < 51) {
      ageRangeCounts[4]++;
    } else if (age < 61) {
      ageRangeCounts[5]++;
    } else {
      ageRangeCounts[6]++;
    }
  });

  // Create data for the chart
  const data = {
    labels: ageRanges,
    datasets: [
      {
        label: 'Number of Users',
        data: ageRangeCounts,
        backgroundColor: '#76ABAE', 
        borderColor: '#222831', 
        hoverBackgroundColor: '#222831',// Solid blue color
        // borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2 style={{color:"black"}}>Users by Age Range</h2>
      <Bar data={data} />
    </div>
  );
};
export default AgeDistribution;
