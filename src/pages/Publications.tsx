import React from "react";
import { CalendarDays, ExternalLink, FileText, Award } from "lucide-react";

const filters = [
  "All Publications (9)",
  "Journal Articles (3)",
  "Conference Proceedings (4)",
  "Posters (1)",
  "Others (1)",
];

const stats = [
  { label: "Total Publications", value: "9" },
  { label: "Peer-Reviewed Articles", value: "3" },
  { label: "Conference Presentations", value: "4" },
];

const publications = [
  {
    type: "Journal",
    title:
      "Automated identification of orthopedic implants on radiographs using deep learning",
    authors:
      "Patel, R., Thong, E.H., Batta, V., Bharath, A.A., Francis, D., Howard, J.",
    journal: "Radiology: Artificial Intelligence, 3(4), e200183",
    date: "2021",
    abstract:
      "Published in Radiology: AI, this research showcases a robust model for implant identification on radiographs.",
    tags: ["Radiograph", "Deep Learning", "Journal"],
    link: "https://pubs.rsna.org/doi/full/10.1148/ryai.2021200183",
  },
  {
    type: "Journal",
    title:
      "Automated classification of total knee replacement prosthesis on plain film radiograph using a deep convolutional neural network",
    authors: "Belete, S.C., Batta, V., Kunz, H.",
    journal: "Informatics in Medicine Unlocked, 25, 100669",
    date: "2021",
    abstract:
      "This work applies convolutional neural networks for automated classification of knee prostheses using plain radiographs.",
    tags: ["Knee", "CNN", "Classification"],
    link: "https://www.sciencedirect.com/science/article/pii/S2352914821001544",
  },
  {
    type: "Journal",
    title: "Knee implant identification by fine-tuning deep learning models",
    authors:
      "Sharma, S., Batta, V., Chidambaranathan, M., Mathialagan, P., Mani, G., Kiruthika, M., Datta, B., Kamineni, S., Reddy, G., Masilamani, S., Vijayan, S.",
    journal: "Indian Journal of Orthopaedics, 55, 1295–1305",
    date: "2021",
    abstract:
      "This study fine-tunes CNNs for implant classification, improving performance on knee implant datasets.",
    tags: ["Knee", "Transfer Learning", "Orthopaedics"],
    link: "https://link.springer.com/article/10.1007/s43465-021-00529-9",
  },
  {
    type: "Conference",
    title:
      "Artificial intelligence based identification of Total Knee Arthroplasty Implants",
    authors: "Ghose, S., Datta, S., Batta, V., Malathy, C.",
    journal: "International Conference on Intelligent Sustainable Systems (ICISS)",
    date: "2020",
    abstract:
      "Presented at ICISS 2020, this paper proposes an AI system for knee arthroplasty implant detection.",
    tags: ["Knee", "ICISS", "AI"],
    link: "https://ieeexplore.ieee.org/abstract/document/10179730",
  },
  {
    type: "Conference",
    title:
      "Automatic Identification of Make and Model of Ankle Implants using Artificial Intelligence",
    authors:
      "Ali, S.M., Nara, S., Ramanathan, A., Malathy, C., Athilakshmi, R., Gayathri, M., Batta, V.",
    journal:
      "Fifth International Conference on Electrical, Computer and Communication Technologies (ICECCT), IEEE",
    date: "Feb 2023",
    abstract:
      "Presents a model to identify specific ankle implant models using anterior-posterior radiographs.",
    tags: ["Ankle", "AI", "IEEE"],
    link: "https://link.springer.com/chapter/10.1007/978-3-031-53085-2_11",
  },
  {
    type: "Conference",
    title:
      "Automated Knee Implant Identification from 2D Templates Using Image Processing and Artificial Intelligence – An Experimental Approach",
    authors: "Jadhav, R., Purwar, T., Ramanathan, A., Malathy, C., Gayathri, M., Batta, V.",
    journal:
      "International Conference on Artificial Intelligence and its Application, Springer",
    date: "2023",
    abstract:
      "Describes a novel experimental approach using template-based matching and AI for knee implant identification.",
    tags: ["Knee", "Templates", "AI"],
    link: "https://link.springer.com/chapter/10.1007/978-3-031-84397-6_14",
  },
  {
    type: "Conference",
    title:
      "Harnessing the potential of deep learning for total shoulder implant classification: a comparative study",
    authors:
      "Mishra, A., Ramanathan, A., Batta, V., Malathy, C., Kundu, S.S., Gayathri, M.",
    journal: "Annual Conference on Medical Image Understanding and Analysis (MIUA), Springer",
    date: "2023",
    abstract:
      "Compares deep learning architectures for accurate classification of total shoulder implants.",
    tags: ["Shoulder", "Deep Learning", "MIUA"],
    link: "https://link.springer.com/chapter/10.1007/978-3-031-48593-0_9",
  },
  {
    type: "Conference",
    title:
      "Automated Make and Model Identification of Reverse Shoulder Implants Using Deep Learning Methodology",
    authors:
      "Dubey, V.P., Ramanathan, A., Rajagopalan, S., Malathy, C., Gayathri, M., Batta, V., Kamineni, S.",
    journal:
      "International Conference on Recent Trends in Image Processing and Pattern Recognition, Springer",
    date: "Dec 2023",
    abstract:
      "Applies AI-based pattern detection for accurate reverse shoulder implant identification across various designs.",
    tags: ["Shoulder", "Deep Learning", "Reverse Implant"],
    link: "https://www.researchgate.net/publication/363464689_Artificial_Intelligence_based_identification_of_Total_Knee_Arthroplasty_Implants",
  },
  {
    type: "Poster",
    title:
      "Supra-human orthopedic implant identification in radiographs using deep learning",
    authors: "R. Patil et al.",
    journal: "BOA Virtual Congress, Imperial College, UK",
    date: "2020",
    abstract:
      "Presented at BOA Congress, this study demonstrates deep learning surpassing human-level accuracy in identifying orthopedic implants.",
    tags: ["Radiograph", "Deep Learning", "Poster"],
    link: "https://www.researchgate.net/publication/389808026_Automated_Knee_Implant_Identification_from_2D_Templates_Using_Image_Processing_and_Artificial_Intelligence_-_An_Experimental_Approach",
  },
];

const Publications: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Research Publications
          </h1>
          <p className="text-gray-600 text-lg">
            Peer-reviewed research, conference presentations, and educational
            content advancing the field of AI-powered medical imaging and
            implant identification.
          </p>
        </div>

        {/* Awards & Recognition */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <Award className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">Awards &amp; Recognition</h2>
          </div>
          <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden grid grid-cols-1 md:grid-cols-5">
            {/* Certificate preview */}
            <a
              href="/certificate.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="md:col-span-2 block bg-gray-100 p-4 flex items-center justify-center"
            >
              <img
                src="/certificate-preview.png"
                alt="RCR 2nd Global AI Conference winning certificate"
                className="w-full max-w-xs rounded-lg shadow-sm ring-1 ring-gray-200"
                loading="lazy"
              />
            </a>

            {/* Details */}
            <div className="md:col-span-3 p-6 sm:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-sm text-red-600 font-semibold mb-2">
                <Award className="w-4 h-4" />
                <span>Winner &middot; Pitch Your Idea</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                RCR 2nd Global AI Conference &mdash; Pitch Your Idea Competition
              </h3>
              <p className="text-gray-700 text-sm mb-3">
                Awarded to <span className="font-medium text-gray-900">Vineet Batta</span> for the idea
                &ldquo;Automated Identification &amp; Analysis of implanted orthopedic prosthesis visible on
                radiographs using AI&rdquo; &mdash; the research behind this platform.
              </p>
              <p className="text-sm text-gray-500 mb-5">
                Presented by <span className="font-medium text-gray-700">The Royal College of Radiologists</span>.
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4" />
                  <span>29&ndash;30 June 2026</span>
                </div>
                <a
                  href="/certificate.pdf"
                  className="flex items-center gap-1 text-blue-600 font-medium hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Certificate
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {filters.map((filter, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                idx === 0
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300"
              } hover:shadow`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`p-6 text-center rounded-xl shadow bg-white ${
                stat.highlight ? "text-red-600 font-semibold" : "text-gray-700"
              }`}
            >
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Publication Cards */}
        <div className="grid grid-cols-1 gap-8">
          {publications.map((pub, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex items-center gap-2 text-sm text-blue-600 font-medium mb-2">
                <FileText className="w-4 h-4" />
                <span>{pub.type}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {pub.title}
              </h3>
              <p className="text-gray-600 text-sm mb-1">{pub.authors}</p>
              <p className="text-sm text-gray-500 mb-4">
                <span className="font-medium text-gray-700">Published in:</span>{" "}
                {pub.journal}
              </p>
              <p className="text-gray-700 text-sm mb-4">{pub.abstract}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {pub.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="px-2 py-1 text-xs bg-gray-100 rounded-full text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4" />
                  <span>{pub.date}</span>
                </div>
                <a
                  href={pub.link}
                  className="flex items-center gap-1 text-blue-600 font-medium hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4" />
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Publications;

