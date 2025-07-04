import React from 'react';
import { Linkedin, Mail, GraduationCap } from 'lucide-react';

const Team = () => {
  const founder = {
    name: 'Dr. Vineet Batta',
    title: 'Founder & CEO, Unicorn Medics',
    image: '',
    email: 'vineet.batta@unicornmedics.com',
    linkedin: '#',
    education:
      'MBBS • MS (Trauma) • Dip Sports Med • FRCS (Orth) • MD (Ortho Research & Bio Med Eng.)',
    bio: `Orthopedic surgeon specialising in trauma, hip & knee replacement. Senior Clinical Fellow, Luton & Dunstable University NHS Hospital; Honorary Lecturer, Royal National Orthopaedic Hospital, UCL. Award-winning researcher with >£90k in competitive grants.`
  };

  const mentors = [
    {
      name: 'Dr Parth Desai',
      title: 'Founder & CEO, Implant Identifier',
      image: '',
      linkedin: '#',
      bio: ''
    }
  ];

  const technicalAdvisors = [
    {
      name: 'Prof Malathy',
      title: 'Professor, Networking & Communications',
      image: '',
      linkedin: '#',
      bio: ''
    },
    {
      name: 'Ass. Prof Dr Gayathri M',
      title: 'Assistant Professor, Computing Technologies',
      image: '',
      linkedin: '#',
      bio: ''
    }
  ];

  const coreTeam = [
    { name: 'Kiruthika M', title: 'Research Associate', image: '', linkedin: '#', bio: '' },
    { name: 'Auxilia', title: 'Data Curator', image: '', linkedin: '#', bio: '' },
    { name: 'Soumya', title: 'Technical Director', image: '', linkedin: '#', bio: '' },
    { name: 'Ramanathan', title: 'Core Team', image: '', linkedin: '#', bio: '' }
  ];

  const interns = [
    { name: 'Lakshay Chhabra', title: 'Intern', image: '', linkedin: '#', bio: '' },
    { name: 'Priyansh Sonthalia', title: 'Intern', image: '', linkedin: '#', bio: '' },
    { name: 'Abhinav', title: 'Intern', image: '', linkedin: '#', bio: '' }
  ];

  const TeamCard = ({ member, showEmail = false }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6 flex flex-col items-center text-center">
        <div className="w-32 h-32 mb-4 overflow-hidden rounded-full border-4 border-gradient-to-r from-primary-500 to-emerald-500">
          <img
            src={member.image || 'https://via.placeholder.com/300'}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
        <p className="text-primary-600 font-semibold mb-3">{member.title}</p>

        {member.education && (
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <GraduationCap className="w-4 h-4 mr-1" />
            <span>{member.education}</span>
          </div>
        )}

        {member.bio && (
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
        )}

        <div className="flex space-x-3">
          <a href={member.linkedin} className="p-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors duration-200">
            <Linkedin className="w-5 h-5" />
          </a>
          {showEmail && member.email && (
            <a href={`mailto:${member.email}`} className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors duration-200">
              <Mail className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Meet Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experienced professionals dedicated to innovation in orthopedic surgery, biomedical imaging, and AI.
          </p>
        </header>

        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Founder</h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <TeamCard member={founder} showEmail />
          </div>
        </section>

        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mentors</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
            {mentors.map((m, i) => (
              <TeamCard key={i} member={m} />
            ))}
          </div>
        </section>

        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Technical Advisors</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
            {technicalAdvisors.map((t, i) => (
              <TeamCard key={i} member={t} />
            ))}
          </div>
        </section>

        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Team</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
            {coreTeam.map((c, i) => (
              <TeamCard key={i} member={c} />
            ))}
          </div>
        </section>
         <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Interns</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
            {interns.map((intern, i) => (
              <TeamCard key={i} member={intern} />
            ))}
          </div>
        </section>

        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Collaborations</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We collaborate with world-class hospitals, universities, and med-tech companies leading the way in orthopedic surgery and biomedical innovation.
            </p>
          </div>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center">
              <img
                src="https://www.necsws.com/wp-content/themes/nec/NEC/img/NEC_SWS_Lockup.svg"
                alt="NEC Software Solutions"
                className="w-24 h-24 object-contain mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                National Joint Registry / NEC Software Solutions, UK
              </h3>
              <a
                href="https://www.necsws.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                NEC Software Solutions | Orchestrating a Brighter World
              </a>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center">
              <img
                src="https://d23qowwaqkh3fj.cloudfront.net/wp-content/uploads/2022/01/srm-logo-white.svg.gzip"
                alt="SRM Institute"
                className="w-24 h-24 object-contain mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                SRM Institute of Science and Technology, Chennai
              </h3>
              <a
                href="https://www.srmist.edu.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                SRM Institute of Science & Technology - Learn. Leap. Lead.
              </a>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center">
              <img
                src="https://implantidentifier.app/assets/img/logo.png"
                alt="Implant Identifier"
                className="w-24 h-24 object-contain mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Implant Identifier App
              </h3>
              <a
                href="https://implantidentifier.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                Implant Identifier
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Team;
