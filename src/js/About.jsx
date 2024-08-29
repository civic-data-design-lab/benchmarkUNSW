import React from 'react';
import '../style/Font.css';
import '../style/About.css';
import '../style/Main.css';

function About() {
    return (
        <div>
            <section id="project" className="nova-mono-regular full-page align-vertical">
                <div className="about-title">
                    <p>Project</p>
                </div>
                <div className="about-p">
                    <p className="about-p-text">BenchMark is an experimental project that uses street furniture to measure the
                        dynamics of public space and understand how UNSW students, particularly women,
                        girls and gender diverse people, interact with and move seating in public space.</p>
                    <p className="about-p-text">The seats include motion enabled lighting and were designed by female UNSW
                        Industrial Design Students. Camera-vision sensors and onsite observation
                        and surveys monitor and help us understand where and how they move.</p>
                    <p className="about-p-text">This project has been funded by Transport for NSW through the Safer
                        Cities program.</p>
                </div>
            </section>
            <section id="data-analysis" className="nova-mono-regular full-page">
                <h2>Data Analysis Result</h2>
                <p>Details about data analysis...</p>
                <p>Details about data analysis...</p>

                <p>Details about data analysis...</p>

                <p>Details about data analysis...</p>

            </section>
            <section id="bench-design" className="nova-mono-regular full-page">
                <h2>Bench Design</h2>
                <p>Details about bench design...</p>
            </section>
            <section id="dtpr" className="nova-mono-regular full-page">
                <h2>DTPR</h2>
                <p>Details about DTPR...</p>
            </section>
            <section id="team" className="nova-mono-regular full-page">
                <h2>Team</h2>
                <p>Details about the team...</p>
            </section>
        </div>
    );
}

export default About;
