/* Peer-reviewed output behind the AIIMAGING platform. */

export type PublicationType = 'Journal' | 'Conference' | 'Poster';

export type Publication = {
  type: PublicationType;
  title: string;
  authors: string;
  journal: string;
  date: string;
  abstract: string;
  tags: string[];
  link: string;
};

export const publications: Publication[] = [
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
