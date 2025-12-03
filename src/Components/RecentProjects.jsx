import React from "react";
import "./RecentProjects.css";

const ProjectTable = ({ projects }) => {
  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="project-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Client</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Team</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index}>
                <td data-label="Project Name">{project.name}</td>
                <td data-label="Client">{project.client}</td>
                <td data-label="Status">
                  <span
                    className={`status-badge ${project.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {project.status}
                  </span>
                </td>
                <td data-label="Progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${project.progress}%`,
                        background: project.progressColor || "#FFA500",
                      }}
                    ></div>
                  </div>
                </td>
                <td data-label="Team">
                  <span className="icon-team">👥</span>
                </td>
                <td data-label="Deadline">
                  <span className="icon-calendar">📅</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Example usage component
const App = () => {
  const projectData = [
    {
      name: "Website Redesign",
      client: "TechCorp Inc.",
      status: "In Progress",
      progress: 65,
      progressColor: "linear-gradient(90deg, #FFA500 0%, #FF8C00 100%)",
    },
    {
      name: "Mobile App",
      client: "FinanceHub",
      status: "Review",
      progress: 80,
      progressColor: "linear-gradient(90deg, #FFA500 0%, #FF8C00 100%)",
    },
    {
      name: "Brand Identity",
      client: "StyleCo",
      status: "In Progress",
      progress: 45,
      progressColor: "linear-gradient(90deg, #FFA500 0%, #D2691E 100%)",
    },
    {
      name: "Data Migration",
      client: "DataViz Inc.",
      status: "Pending",
      progress: 30,
      progressColor: "linear-gradient(90deg, #FFA500 0%, #D2691E 100%)",
    },

        {
      name: "Data Migration",
      client: "DataViz Inc.",
      status: "Pending",
      progress: 30,
      progressColor: "linear-gradient(90deg, #FFA500 0%, #D2691E 100%)",
    },

        {
      name: "Data Migration",
      client: "DataViz Inc.",
      status: "Pending",
      progress: 30,
      progressColor: "linear-gradient(90deg, #FFA500 0%, #D2691E 100%)",
    },

        {
      name: "Data Migration",
      client: "DataViz Inc.",
      status: "Pending",
      progress: 30,
      progressColor: "linear-gradient(90deg, #FFA500 0%, #D2691E 100%)",
    },


        {
      name: "Data Migration",
      client: "DataViz Inc.",
      status: "Pending",
      progress: 30,
      progressColor: "linear-gradient(90deg, #FFA500 0%, #D2691E 100%)",
    },


        {
      name: "Data Migration",
      client: "DataViz Inc.",
      status: "Pending",
      progress: 30,
      progressColor: "linear-gradient(90deg, #FFA500 0%, #D2691E 100%)",
    },


        {
      name: "Data Migration",
      client: "DataViz Inc.",
      status: "Pending",
      progress: 30,
      progressColor: "linear-gradient(90deg, #FFA500 0%, #D2691E 100%)",
    },


        {
      name: "Data Migration",
      client: "DataViz Inc.",
      status: "Pending",
      progress: 30,
      progressColor: "linear-gradient(90deg, #FFA500 0%, #D2691E 100%)",
    },

        {
      name: "Data Migration",
      client: "DataViz Inc.",
      status: "Pending",
      progress: 30,
      progressColor: "linear-gradient(90deg, #FFA500 0%, #D2691E 100%)",
    },

        {
      name: "Data Migration",
      client: "DataViz Inc.",
      status: "Pending",
      progress: 30,
      progressColor: "linear-gradient(90deg, #FFA500 0%, #D2691E 100%)",
    },

        {
      name: "Data Migration",
      client: "DataViz Inc.",
      status: "Pending",
      progress: 30,
      progressColor: "linear-gradient(90deg, #FFA500 0%, #D2691E 100%)",
    },
  ];

  return (
    <div style={{  minHeight: "100vh" , minWidth: "100%"}}>
      <ProjectTable projects={projectData} />
    </div>
  );
};

export default App;
