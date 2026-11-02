const IMAGE_BASE = "/creative/pensil-2026";

export const projectImages = {
  design: `${IMAGE_BASE}/01-proses-desain.jpeg`,
  goldStar: `${IMAGE_BASE}/02-piala-bintang-emas.jpeg`,
  weighing: `${IMAGE_BASE}/03-material-2904-gram.jpeg`,
  redStar: `${IMAGE_BASE}/04-piala-bintang-merah.jpeg`,
  orangeStar: `${IMAGE_BASE}/05-piala-bintang-oranye.jpeg`,
  multicolorStar: `${IMAGE_BASE}/06-piala-bintang-multiwarna.jpeg`,
  whiteStar: `${IMAGE_BASE}/07-piala-bintang-putih.jpeg`,
  trophies: `${IMAGE_BASE}/08-deretan-piala.jpeg`,
  handover: `${IMAGE_BASE}/09-penyerahan-piala.jpeg`,
};

export type PensilPhoto = {
  src: string;
  altKey: string;
  captionKey: string;
};

export const pensilGallery: PensilPhoto[] = [
  {
    src: projectImages.design,
    altKey: "pensil2026.photoAlts.design",
    captionKey: "pensil2026.photoCaptions.design",
  },
  {
    src: projectImages.goldStar,
    altKey: "pensil2026.photoAlts.goldStar",
    captionKey: "pensil2026.photoCaptions.goldStar",
  },
  {
    src: projectImages.weighing,
    altKey: "pensil2026.photoAlts.weighing",
    captionKey: "pensil2026.photoCaptions.weighing",
  },
  {
    src: projectImages.redStar,
    altKey: "pensil2026.photoAlts.redStar",
    captionKey: "pensil2026.photoCaptions.redStar",
  },
  {
    src: projectImages.orangeStar,
    altKey: "pensil2026.photoAlts.orangeStar",
    captionKey: "pensil2026.photoCaptions.orangeStar",
  },
  {
    src: projectImages.multicolorStar,
    altKey: "pensil2026.photoAlts.multicolorStar",
    captionKey: "pensil2026.photoCaptions.multicolorStar",
  },
  {
    src: projectImages.whiteStar,
    altKey: "pensil2026.photoAlts.whiteStar",
    captionKey: "pensil2026.photoCaptions.whiteStar",
  },
  {
    src: projectImages.trophies,
    altKey: "pensil2026.photoAlts.trophies",
    captionKey: "pensil2026.photoCaptions.trophies",
  },
  {
    src: projectImages.handover,
    altKey: "pensil2026.photoAlts.handover",
    captionKey: "pensil2026.photoCaptions.handover",
  },
];

export const pensilProject = {
  slug: "pensil-2026",
  title: "PENSIL 2026",
  partner: "ROHIS SMA Negeri 1 Manado",
  year: 2026,
  materialWeight: "2.904 gram",
  handoverDate: "12 Oktober 2026",
  tags: ["Custom Trophy", "Recycled Plastic", "Project Recap"],
};
