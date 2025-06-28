import React from "react";
import { CalendarDays, ExternalLink, FileText } from "lucide-react";

const filters = [
  "All Publications (10)",
  "Journal Articles (3)",
  "Posters (1)",
  "Conference Proceedings (5)",
  "Video Presentations (1)",
];

const stats = [
  { label: "Total Publications", value: "25+" },
  { label: "Peer-Reviewed Articles", value: "15" },
  { label: "Conference Presentations", value: "8" },
  { label: "Total Citations", value: "450+", highlight: true },
];

const publications = [
  {
    type: "Conference",
    title:
      "Supra-human orthopedic implant identification in radiographs using deep learning",
    authors: "R. Patil et al.",
    journal: "BOA Virtual Congress 2020, Imperial College, UK",
    date: "2020",
    abstract:
      "Presented at BOA Congress, this study demonstrates deep learning surpassing human-level accuracy in identifying orthopedic implants.",
    tags: ["Radiograph", "Deep Learning", "BOA"],
    link: "#",
  },
  {
    type: "Journal",
    title:
      "Automated identification of orthopedic implants on radiographs using deep learning",
    authors:
      "Patel, R., Thong, E.H., Batta, V., Bharath, A.A., Francis, D., Howard, J.",
    journal: "Radiology: Artificial Intelligence",
    date: "2021",
    abstract:
      "Published in Radiology: AI, this research showcases a robust model for implant identification on radiographs.",
    tags: ["Journal", "X-ray", "Radiology"],
    link: "#",
  },
  {
    type: "Journal",
    title:
      "Automated classification of total knee replacement prosthesis on plain film radiograph using a CNN",
    authors: "Samuel C. Belete, Vineet Batta, Holger Kunz",
    journal: "Informatics in Medicine Unlocked",
    date: "2021",
    abstract:
      "This work applies convolutional neural networks for automated classification of knee prostheses using plain radiographs.",
    tags: ["Knee", "CNN", "Classification"],
    link: "#",
  },
  {
    type: "Conference",
    title:
      "AI-based identification of Total Knee Arthroplasty Implants",
    authors:
      "Smaranjit Ghose, Suhrid Datta, Vineet Batta, Dr. C. Malathy, Gayathri M",
    journal: "ICISS 2020, IEEE Xplore",
    date: "2020",
    abstract:
      "Presented at ICISS 2020, this paper proposes an AI system for knee arthroplasty implant detection.",
    tags: ["Knee", "ICISS", "AI"],
    link: "#",
  },
  {
    type: "Journal",
    title:
      "Knee Implant Identification by Fine-Tuning Deep Learning Models",
    authors:
      "Sukkrit Sharma, Vineet Batta, Malathy C., et al.",
    journal: "Indian Journal of Orthopaedics",
    date: "September 2021",
    abstract:
      "This study fine-tunes CNNs for implant classification, improving performance on knee implant datasets.",
    tags: ["Knee", "Transfer Learning", "Orthopaedics"],
    link: "https://doi.org/10.1007/s43465-021-00529-9",
  },
  {
    type: "Conference",
    title:
      "Automatic Identification of Make and Model of Ankle Implants using AI",
    authors:
      "Shaik Mushkin Ali, Sahithi Nara, A. Ramanathan, C. Malathy, R. Athilakshmi, M. Gayathri, Vineet Batta",
    journal: "IEEE Xplore",
    date: "July 2023",
    abstract:
      "Presents a model to identify specific ankle implant models using anterior-posterior radiographs.",
    tags: ["Ankle", "AI", "IEEE"],
    link: "#",
  },
  {
    type: "Conference",
    title:
      "Identification of Knee Prostheses from Lateral Radiographs Using Deep Learning",
    authors:
      "Johny Samuel S., Neil Bagewadi, Malathy C., Balasaraswathi V.R., Gayathri M., Vineet Batta, A. Ramanathan",
    journal: "EECSS’23, London",
    date: "Aug 2023",
    abstract:
      "Describes an AI pipeline that accurately classifies lateral knee radiographs using deep learning.",
    tags: ["Knee", "EECSS", "Lateral"],
    link: "#",
  },
  {
    type: "Conference",
    title:
      "Automated Identification of Make and Model of Total Wrist Replacement Implants using Deep Learning",
    authors:
      "Saisha Shetty, Naman Garg, Gayathri M, Malathy C, Vineet Batta, A. Ramanathan",
    journal: "EECSS’23, London",
    date: "Aug 2023",
    abstract:
      "This study utilizes CNNs to identify total wrist replacement implant models from imaging data.",
    tags: ["Wrist", "Deep Learning", "EECSS"],
    link: "#",
  },
  {
    type: "Conference",
    title: "Identification of Ankle Implants Using Anterior Posterior View",
    authors:
      "Shaik Mushkin Ali, R. Athilakshmi, A. Ramanathan, Sahithi Nara, M. Gayathri, C. Malathy, Vineet Batta",
    journal: "Conference Presentation",
    date: "Dec 2023",
    abstract:
      "Demonstrates implant recognition from AP views, achieving high classification accuracy on ankle implant datasets.",
    tags: ["Ankle", "Radiograph", "AP View"],
    link: "#",
  },
  {
    type: "Journal",
    title:
      "Automated Make and Model Identification of Reverse Shoulder Implants Using Deep Learning Methodology",
    authors:
      "Ved Prakash Dubey, A. Ramanathan, S. Rajagopalan, C. Malathy, M. Gayathri, Vineet Batta, Srinath Kamineni",
    journal: "Journal Submission",
    date: "Jan 30, 2024",
    abstract:
      "Applies AI-based pattern detection for accurate reverse shoulder implant identification across various designs.",
    tags: ["Shoulder", "Deep Learning", "Reverse Implant"],
    link: "#",
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
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
