import React from "react";
import styles from "./VideosHero.module.css";

import { ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
// import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const barChartOptions = {
  plugins: {
    legend: {
      labels: {
        color: "white", 
      },
    },
  },
};

const VideosHero = ({ storage, bandwidth, profile }) => {
  const formattedStorage = (storage / 1000).toFixed(2);
  const formattedBandwidth = (bandwidth / 1000).toFixed(2);

  const storageData = {
    labels: ["Used Storage (MB)", "Remaining Storage (MB)"],
    datasets: [
      {
        data: [50 - formattedStorage, formattedStorage],
        backgroundColor: ["#E0E0E0", "#FFCE56"],
      },
    ],
  };

  const bandwidthData = {
    labels: ["Used Bandwidth (MB)", "Remaining Bandwidth (MB)"],
    datasets: [
      {
        data: [100 - formattedBandwidth, formattedBandwidth],
        backgroundColor: ["#E0E0E0", "green"],
      },
    ],
  };

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={`${styles.title} mb-4`}>Welcome {profile.username}, to Video Galleria</h1>
        <p className={styles.description}>
          Total Storage: 50 Mb
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          Remaining Storage: {formattedStorage} Mb
        </p>
        <p className={styles.description}>
          Total Daily Bandwith: 100 Mb &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          Remaining Bandwith: {formattedBandwidth} Mb
        </p>
      </div>
 
  <div className={styles.videoContainer}>
      <Pie   data={storageData} options={barChartOptions} />
      <Pie   data={bandwidthData} options={barChartOptions} />
    </div>
    </div>
  );
};

export default VideosHero;
