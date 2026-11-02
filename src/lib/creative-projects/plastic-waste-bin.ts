const IMAGE_BASE = "/creative/plastic-waste-bin";

export const projectImages = {
  prototype: `${IMAGE_BASE}/01-prototype.jpeg`,
  team: `${IMAGE_BASE}/02-tim-produksi.jpeg`,
  base: `${IMAGE_BASE}/03-tatakan-plastik.jpeg`,
  lid: `${IMAGE_BASE}/04-penutup-plastik.jpeg`,
  hook: `${IMAGE_BASE}/05-kait-penutup.jpeg`,
  rationale: `${IMAGE_BASE}/06-alasan-proyek.jpeg`,
};

export type PlasticWasteBinPhoto = {
  src: string;
  altKey: string;
  captionKey: string;
};

export const plasticWasteBinGallery: PlasticWasteBinPhoto[] = [
  {
    src: projectImages.prototype,
    altKey: "plasticWasteBin.photoAlts.prototype",
    captionKey: "plasticWasteBin.photoCaptions.prototype",
  },
  {
    src: projectImages.team,
    altKey: "plasticWasteBin.photoAlts.team",
    captionKey: "plasticWasteBin.photoCaptions.team",
  },
  {
    src: projectImages.base,
    altKey: "plasticWasteBin.photoAlts.base",
    captionKey: "plasticWasteBin.photoCaptions.base",
  },
  {
    src: projectImages.lid,
    altKey: "plasticWasteBin.photoAlts.lid",
    captionKey: "plasticWasteBin.photoCaptions.lid",
  },
  {
    src: projectImages.hook,
    altKey: "plasticWasteBin.photoAlts.hook",
    captionKey: "plasticWasteBin.photoCaptions.hook",
  },
  {
    src: projectImages.rationale,
    altKey: "plasticWasteBin.photoAlts.rationale",
    captionKey: "plasticWasteBin.photoCaptions.rationale",
  },
];

export const plasticWasteBinProject = {
  slug: "plastic-waste-bin",
  title: "Plastic Waste Bin",
  category: "Waste Infrastructure",
  material: "Iron mesh frame with recycled plastic details",
  tags: ["Recycled Plastic", "Waste Sorting", "Project Recap"],
};
