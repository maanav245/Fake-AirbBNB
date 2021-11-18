import { Line } from 'react-chartjs-2';
import React from 'react';
import PropTypes from 'prop-types';
// Stub code borrowed from https://www.educative.io/edpresso/how-to-use-chartjs-to-create-charts-in-react

/*
Simple function used to convert a specific date string into something more user friendly dd/mm/yy
*/
const formatDate = (date) => {
  const year = date.split('-')[0];
  const month = date.split('-')[1];
  const day = date.split('-')[2].split('T')[0];
  const formattedDate = day + '/' + month + '/' + year;
  return formattedDate;
}
ProfitGraph.propTypes = {
  bookings: PropTypes.array,

};

/*
A profit graph created up from a external library, which calculates the earning of an individual
*/

export default function ProfitGraph ({ bookings }) {
  const totalList = bookings
  const LabelData = [0].concat(totalList.map((b) => formatDate(b.date)));
  const LineData = [0].concat(totalList.map((b) => b.price));
  console.log(totalList);
  const date = new Date();
  const longMonth = date.toLocaleString('en-us', { month: 'long' });
  const state = {

    labels: LabelData,
    datasets: [
      {

        label: 'Profit in ' + longMonth,
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: LineData,
      }
    ]
  }

  return (
    <div style={{ height: '50vh', width: '80vw' }}>
        <Line
        data={state}
        options={{
          title: {
            display: true,
            text: 'Average Rainfall per month',
            fontSize: 40
          },
          legend: {
            display: true,
            position: 'right'
          }
        }}
        />
    </div>
  )
}
