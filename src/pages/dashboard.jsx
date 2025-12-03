import React from "react";
import "./dashboard.css";
import Nav from "../Components/Nav";
import { Helmet } from "react-helmet";
import TopBar from "../Components/TopBar";
import PageTitle from "../common/PageTitle";
import StatsContainer from "../Components/StatsContainer";
import UsersIcon from "../assets/Icons/Users Icon.svg";
import GainIcon from "../assets/Icons/Gain Icon.svg";
import ProjectsIcon from '../assets/Icons/Projects Icon.svg';
import MoneyIcon from '../assets/Icons/Money Icon.svg';
import PulseIcon from '../assets/Icons/Pulse Icon.svg';
import AnalyticsIcon from '../assets/Icons/Analytics Icon.svg';
import ClockIcon from '../assets/Icons/Clock Icon.svg';
import SectionTitle from './../common/SectionTitle';
import Graph from "../Components/Graph";
import RecentContent from "../common/RecentContent";
const dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard-HeshamAbozaid-490469420</title>
        <meta name="description" content="This is the dashboard Page" />
        <meta property="og:title" content="Login" />
      </Helmet>
      <Nav />
      <div className="DashboardContainer">
        <TopBar />
        <section className="Content">
          <PageTitle
            Title="Dashboard Overview"
            SubTitle="Welcome back, here's what's happening with your projects today."
          />

          <section className="StatsContainers">
          <article className="Stats">
            <StatsContainer
              StatIcon={UsersIcon}
              StatGainIcon={GainIcon}
              StatGain="+12.5%"
              StatTitle="Total Users"
              StatNumber="12,458"
            />
            
          </article>

                    <article className="Stats">
            <StatsContainer
              StatIcon={ProjectsIcon}
              StatGainIcon={GainIcon}
              StatGain="+8.2%"
              StatTitle="Active Projects"
              StatNumber="20"
            />
            
          </article>

                    <article className="Stats">
            <StatsContainer
              StatIcon={MoneyIcon}
              StatGainIcon={GainIcon}
              StatGain="+23.1%"
              StatTitle="Revenue"
              StatNumber="$54,239"
            />
            
          </article>

                    <article className="Stats">
            <StatsContainer
              StatIcon={PulseIcon}
              StatGainIcon={GainIcon}
              StatGain="+4.3%"
              StatTitle="Server Load"
              StatNumber="68%"
            />
            
          </article>

          </section>

          <section className="GraphContainer">

            <article className="GraphHead">

            <div className="GraphIcon">
            <img src={AnalyticsIcon} alt="Analytics Icon" />
            </div>
          <SectionTitle SecTitle ="Analytics Overview" SecSubTitle = "Monthly performance metrics"/>
            </article>

            <Graph/>

          </section>

          <section className="RecentContainer">
              <article className="GraphHead">
                <div className="GraphIcon">
                  <img src={ClockIcon} alt="" />
                </div>

            <SectionTitle SecTitle ="Recent Activities" SecSubTitle = "Latest updates and activities"/>
              </article>


            <RecentContent Letters = "HA" Name = "Hesham Abozaid" Activity = "Edited Project Alpha" AppName = "Project Management App" Time = "2 hours ago"/>

            <RecentContent Letters = "MC" Name = "Mark Chen" Activity = "Edited Project Alpha" AppName = "Project Management App" Time = "2 hours ago"/>


            <RecentContent Letters = "ED" Name = "Emma Davis" Activity = "Edited Project Alpha" AppName = "Project Management App" Time = "2 hours ago"/>


            <RecentContent Letters = "JW" Name = "James Wilson" Activity = "Edited Project Alpha" AppName = "Project Management App" Time = "2 hours ago"/>


            <RecentContent Letters = "LA" Name = "James Wilson" Activity = "Edited Project Alpha" AppName = "Project Management App" Time = "2 hours ago"/>


            <RecentContent Letters = "LJ" Name = "Lebron James" Activity = "Edited Project Alpha" AppName = "Project Management App" Time = "2 hours ago"/>


            <RecentContent Letters = "JS" Name = "Java Script" Activity = "Edited Project Alpha" AppName = "Project Management App" Time = "2 hours ago"/>



          </section>

          
        </section>
      </div>
    </>
  );
};

export default dashboard;
