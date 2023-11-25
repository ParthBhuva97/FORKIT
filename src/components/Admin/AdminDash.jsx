import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import axios from "axios";

const AdminDash = () => {
  const [projects, setProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [approved, setApprovedProjects] = useState(0);
  const [pending, setPendingProjects] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/projects/getStats").then((response) => {
      // console.log(response.data);
      setProjects(response.data);
      setApprovedProjects(response.data.approved.length);
      setPendingProjects(response.data.pending.length);
      setTotalProjects(
        response.data.pending.length || 0 +
          response.data.approved.length || 0 +
          response.data.rejected.length || 0
      );
    });
  }, []);

  const barOption = {
    xAxis: {
      type: "category",
      data: ["React", "PHP", "Python", "Java", "C"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [20, 10, 10, 15, 5],
        type: "bar",
        color: "#9fe080",
      },
    ],
  };

  const pieOption = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "Projects Data",
        type: "pie",
        radius: ["30%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: approved, name: "Approved" },
          { value: totalProjects - approved - pending, name: "Rejected" },
          { value: pending, name: "Pending" },
        ],
      },
    ],
  };
  return (
    <div className="w-full flex flex-col justify-start items-start">
      <h1 className="font-bold drop-shadow-md text-indigo-500 text-xl">
        Dashboard
      </h1>
      <div className="w-full grid grid-cols-3 gap-5 mt-5">
        {/* Card 1 */}
        <div className="w-full flex flex-col gap-5 items-center justify-center rounded-lg shadow-md p-5 border border-black">
          <h1 className="font-bold drop-shadow-md text-indigo-500 text-lg">
            Total Projects
          </h1>
          <h1 className="font-bold drop-shadow-md text-black text-3xl">
            {totalProjects}
          </h1>
        </div>
        {/* Card 2 */}
        <div className="w-full flex flex-col gap-5 items-center justify-center rounded-lg shadow-md p-5 border border-black">
          <h1 className="font-bold drop-shadow-md text-indigo-500 text-lg">
            Approved Projects
          </h1>
          <h1 className="font-bold drop-shadow-md text-black text-3xl">
            {approved}
          </h1>
        </div>
        {/* Card 3 */}
        <div className="w-full flex flex-col gap-5 items-center justify-center rounded-lg shadow-md p-5 border border-black">
          <h1 className="font-bold drop-shadow-md text-indigo-500 text-lg">
            Pending Projects
          </h1>
          <h1 className="font-bold drop-shadow-md text-black text-3xl">
            {pending}
          </h1>
        </div>
        {/* Card ends Here */}
      </div>

      {/* Charts Section */}
      <div className="w-full p-5 grid grid-cols-5 gap-3 mt-5">
        <div className="col-span-3 rounded-lg shadow-md hover:shadow-xl duration-300 p-2">
          <ReactEcharts option={barOption} className="w-full" />
        </div>
        <div className="col-span-2 rounded-lg shadow-md hover:shadow-xl duration-300 p-2">
          <ReactEcharts option={pieOption} className="w-full" />
        </div>
      </div>

      {/* Charts Section End */}
    </div>
  );
};

export default AdminDash;
