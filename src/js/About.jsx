import React from 'react';
import '../style/Font.css';
import '../style/About.css';
import '../style/Main.css';

function About() {
    return (
        <div className="about-page">

            {/*Section 1*/}
            <section id="project" className="nova-mono-regular">
                <div className="about-head light-bg">
                    <p className="about-title">Project</p>
                </div>
                <div className="about-p light-bg">
                    <p className="about-txt">BenchMark is an experimental project that uses street furniture to measure the
                        dynamics of public space and understand how UNSW students, particularly women,
                        girls and gender diverse people, interact with and move seating in public space.</p>
                    <p className="about-txt">The seats include motion enabled lighting and were designed by female UNSW
                        Industrial Design Students. Camera-vision sensors and onsite observation
                        and surveys monitor and help us understand where and how they move.</p>
                </div>
                <div className="about-p2 medium-bg">
                    <p p className="about-txt">Project funded by Transport for NSW through the Safer Cities program.</p>
                </div>
            </section>

            {/*Section 2*/}
            <section id="data-analysis" className="nova-mono-regular">
                <div className="about-head light-bg">
                    <p className="about-title">Data Analysis Result</p>
                </div>
                <div className="about-p light-bg">
                    <p className="about-txt">BenchMark is an experimental project that uses street furniture to measure the
                        dynamics of public space and understand how UNSW students, particularly women,
                        girls and gender diverse people, interact with and move seating in public space.</p>
                    <p className="about-txt">The seats include motion enabled lighting and were designed by female UNSW
                        Industrial Design Students. Camera-vision sensors and onsite observation
                        and surveys monitor and help us understand where and how they move.</p>
                </div>
            </section>

            {/*Section 3*/}
            <section id="bench-design" className="nova-mono-regular">
                <div className="medium-bg">
                    <div className="about-head dark-bg">
                        <p className="about-title">Bench Design</p>
                    </div>
                    <p className="about-txt about-p4">
                        Something about the benches having been co-designed with female students
                        in the industrial design program?</p>
                </div>
            </section>

            {/*Section 4*/}
            <section id="team" className="nova-mono-regular">
                <div className="about-head light-bg">
                    <p className="about-title">team</p>
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
                    <p className="about-subtxt">Lorem Ipsum</p>
                    <p className="about-subtxt">Lorem Ipsum</p>
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
                        <p className="about-subtitle">What type of technology is this?</p>
                    </div>
                    <div className="about-p6 light-bg">
                        <p className="about-subtxt">De-Identified Video</p>
                        <hr className="about-hr"></hr>
                        <p className="about-subtxt">Person Detection</p>
                        <hr className="about-hr"></hr>
                        <p className="about-subtxt">Motion Detector</p>
                    </div>
                    {/*2*/}
                    <div className="about-p5">
                        <p className="about-subtitle">What is the purpose of this technology?</p>
                    </div>
                    <div className="about-p6 light-bg">
                        <p className="about-subtxt">Planning & Decision-Making</p>
                        <hr className="about-hr"></hr>
                        <p className="about-subtxt">Research & Development</p>
                    </div>
                    {/*3*/}
                    <div className="about-p5">
                        <p className="about-subtitle">How will this data be processed?</p>
                    </div>
                    <div className="about-p6 light-bg">
                        <p className="about-subtxt">Artificial Intelligence</p>
                        <hr className="about-hr"></hr>
                        <p className="about-subtxt">Reviewed Internally</p>
                    </div>
                    {/*4*/}
                    <div className="about-p5">
                        <p className="about-subtitle">How is the data stored?</p>
                    </div>
                    <div className="about-p6 light-bg">
                        <p className="about-subtxt">Cloud Storage</p>
                        <hr className="about-hr"></hr>
                        <p className="about-subtxt">Encypted</p>
                    </div>
                    {/*5*/}
                    <div className="about-p5">
                        <p className="about-subtitle">Who can access this data?</p>
                    </div>
                    <div className="about-p6 light-bg">
                        <p className="about-subtxt">Data</p>
                    </div>
                </div>

            </section>

        </div>
    );
}

export default About;
