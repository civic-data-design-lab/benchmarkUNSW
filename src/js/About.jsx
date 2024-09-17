import React from "react";
import "../style/Font.css";
import "../style/About.css";
import "../style/Main.css";
import deIDvideoIcon from '../assets/Symbols/De-identified vedio.svg';
import personDetectionIcon from '../assets/Symbols/Persondetection.svg';
import encryptedIcon from '../assets/Symbols/Encrypted.svg';
import accessIcon from '../assets/Symbols/Access.svg';
import aiIcon from '../assets/Symbols/Artificial Intelligent.svg';
import motionDetectionIcon from '../assets/Symbols/Motion detector.svg';
import planningIcon from '../assets/Symbols/Planning & Decision-making.svg';
import RandDIcon from '../assets/Symbols/Research & Development.svg';
import reviewedInternallyIcon from '../assets/Symbols/Reviewed internally.svg';
import cloudStorageIcon from '../assets/Symbols/CloudStorage.svg';

function About() {
  return (
    <div className="about-page">
      {/*Section 1*/}
      <section id="project" className="nova-mono-regular">
        <div className="about-head light-bg">
          <p className="about-title">Project</p>
        </div>
        <div className="about-p light-bg">
          <p className="about-txt">
            BenchMark is an experimental project that uses street furniture to
            measure the dynamics of public space and understand how UNSW
            students, particularly women, girls and gender diverse people,
            interact with and move seating in public space.
          </p>
          <p className="about-txt">
            The seats include motion enabled lighting and were designed by
            female UNSW Industrial Design Students. Camera-vision sensors and
            onsite observation and surveys monitor and help us understand where
            and how they move.
          </p>
        </div>
        <div className="about-p2 medium-bg">
          <p p className="about-txt">
            Project funded by Transport for NSW through the Safer Cities
            program.
          </p>
        </div>
      </section>

      {/*Section 2*/}
      <section id="data-analysis" className="nova-mono-regular">
        <div className="about-head light-bg">
          <p className="about-title">Data Analysis Results</p>
        </div>
        <div className="about-p light-bg">
          <p className="about-txt">
            BenchMark is an experimental project that uses street furniture to
            measure the dynamics of public space and understand how UNSW
            students, particularly women, girls and gender diverse people,
            interact with and move seating in public space.
          </p>
          <p className="about-txt">
            The seats include motion enabled lighting and were designed by
            female UNSW Industrial Design Students. Camera-vision sensors and
            onsite observation and surveys monitor and help us understand where
            and how they move.
          </p>
        </div>
      </section>

      {/*Section 3*/}
      <section id="bench-design" className="nova-mono-regular">
        <div className="medium-bg">
          <div className="about-head dark-bg">
            <p className="about-title">Bench Design</p>
          </div>
          <p className="about-txt about-p4">
            Something about the benches having been co-designed with female
            students in the industrial design program?
          </p>
        </div>
      </section>

      {/*Section 4*/}
      <section id="team" className="nova-mono-regular">
        <div className="about-head light-bg">
          <p className="about-title">Team</p>
        </div>
        <div className="about-p3 light-bg">
          <p className="about-subtitle">MIT LCAU</p>
          <p className="about-subtxt">Sarah Williams</p>
          <p className="about-subtxt">Minwook Kang</p>
          <p className="about-subtxt">Hannah Shumway</p>
          <p className="about-subtxt">Sebastian Ives</p>
          <p className="about-subtxt">Maria Gabriela Carucci</p>
          <p className="about-subtxt">Karen Kuo</p>
        </div>
        <div className="about-p3 light-bg">
          <p className="about-subtitle">UNSW SYDNEY</p>
          <p className="about-subtxt">Gonzalo Portas</p>
          <p className="about-subtxt">Mariano Ramirez</p>
        </div>
        <div className="about-p3 light-bg">
          <p className="about-subtitle">SYDNEY DOT</p>
          <p className="about-subtxt">Zoe Eather</p>
          <p className="about-subtxt">Tracey Chung</p>
          <p className="about-subtxt">Tara Howard</p>
          <p className="about-subtxt">Ella Dunne</p>
        </div>
      </section>

      {/*Section 5*/}
      
      <section id="dtpr" className="nova-mono-regular">
        <div className="medium-bg about-dtpr">
          {/*1*/}
          <div className="about-head dark-bg">
            <p className="about-title">DTPR</p>
          </div>
          <div className="about-p5">
            <p className="about-subtitle">
              What type of technology is this?
            </p>
          </div>
          <div className="about-p6 light-bg">
            <div className="about-p7 about-dtpr-sub">
            <p className="about-subtxt">  <img src={deIDvideoIcon} alt="Deidentified Video" className="svg-icon2" />
              De-Identified Video </p>
              <p className="about-desc about-dtpr-desc">
                Collects video footage of a sufficient resolution where
                individuals can be identified, for example by capturing images
                of faces or unique numbers such as vehicle license plates.
                However, the video is processed in a way that removes
                identifying characteristics before it is used or stored (known
                as de-identified before first use or de-identified on device),
                for example by blurring faces using computer vision.
              </p>
            </div>
            <hr className="about-hr"></hr>
            <div className="about-p7 about-dtpr-sub">
              <p className="about-subtxt">  <img src={personDetectionIcon} alt="Person Detection" className="svg-icon2" />
                Person Detection</p>
              <p className="about-desc about-dtpr-desc">
                Refers to a system that can detect the presence of humans in
                images or videos, and identify where they are located or how
                many there are in an image, but does not identify individuals.
                The technology does not retain or use any personally
                identifiable information.
              </p>
            </div>
            <hr className="about-hr"></hr>
            <div className="about-p7 about-dtpr-sub">
              <p className="about-subtxt"> <img src={motionDetectionIcon} alt="Motion Detection" className="svg-icon2" />
                Motion Detector</p>
              <p className="about-desc about-dtpr-desc">
                Is a sensor that detects the movement of nearby objects. This
                project uses motion detection only for lighting and does not
                capture data.
              </p>
            </div>
          </div>
          {/*2*/}
          <div className="about-p5">
            <p className="about-subtitle">
              What is the purpose of this technology?
            </p>
          </div>
          <div className="about-p6 light-bg">
            <div className="about-p7 about-dtpr-sub">
              <p className="about-subtxt"> <img src={planningIcon} alt="Planning" className="svg-icon2" />
                Planning & Decision-making</p>
              <p className="about-desc about-dtpr-desc">
                Supports the development of future plans; or to enable or
                measure the impact of a decision. Examples include urban
                planning.
              </p>
            </div>
            <hr className="about-hr"></hr>
            <div className="about-p7 about-dtpr-sub">
              <p className="about-subtxt"> <img src={RandDIcon} alt="R & D" className="svg-icon2" />
                Research & Development</p>
              <p className="about-desc about-dtpr-desc">
                Supports exploratory research and testing.
              </p>
            </div>
          </div>
          {/*3*/}
          <div className="about-p5">
            <p className="about-subtitle">How will this data be processed?</p>
          </div>
          <div className="about-p6 light-bg">
            <div className="about-p7 about-dtpr-sub">
              <p className="about-subtxt"> <img src={aiIcon} alt="Artificial Intelligence" className="svg-icon2" />
                Artificial Intelligence</p>
              <p className="about-desc about-dtpr-desc">
                Data that is processed by automated, algorithmic or artificial
                intelligence systems to derive a new result or data point.
                Specifically, we use computer vision, which refers to computer
                science methodologies that enable computers to derive data from
                digital images or video. We process our de-identified video with
                the YOLOv8 algorithm.
              </p>
            </div>
            <hr className="about-hr"></hr>
            <div className="about-p7 about-dtpr-sub">
              <p className="about-subtxt"> <img src={reviewedInternallyIcon} alt="Reviewed Internally" className="svg-icon2" />
                Reviewed Internally</p>
              <p className="about-desc about-dtpr-desc">
                The NSW Government has review processes that consider the
                potential benefits, risks and implications for privacy and harm
                for new technologies or data collection activities. The NSW Gov
                Artificial Intelligence Assurance Framework was completed and
                the team constantly assesses the data for accuracy and
                inconsistencies.
              </p>
            </div>
          </div>
          {/*4*/}
          <div className="about-p5">
            <p className="about-subtitle">How is the data stored?</p>
          </div>
          <div className="about-p6 light-bg">
            <div className="about-p7 about-dtpr-sub">
              <p className="about-subtxt"> <img src={cloudStorageIcon} alt="Cloud Storage" className="svg-icon2" />
                Cloud Storage</p>
              <p className="about-desc about-dtpr-desc">
                Anonymized data is stored on behalf of the organization or the
                data collector in an off-site data centre.
              </p>
            </div>
            <hr className="about-hr"></hr>
            <div className="about-p7 about-dtpr-sub">
              <p className="about-subtxt"> <img src={encryptedIcon} alt="Encrypted" className="svg-icon2" />
                Encrypted</p>
              <p className="about-desc about-dtpr-desc">
                Data has been encoded so that only authorized parties can access
                it, which can reduce risk related to handling private or
                sensitive information.
              </p>
            </div>
          </div>
          {/*5*/}
          <div className="about-p5">
            <p className="about-subtitle">Who can access this data?</p>
          </div>
          <div className="about-p6 light-bg">
            <div className="about-p7 about-dtpr-sub">
              <p className="about-subtxt"> <img src={accessIcon} alt="Data Access" className="svg-icon2" />
                Data</p>
              <p className="about-desc about-dtpr-desc">
                Data is available to the accountable organisation - University
                of NSW. It is also available to Transport for NSWs as well as to
                the data collection technology vendors and partners - MIT
                Leventhal Center for Advanced Urbanism and VivaCity.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
