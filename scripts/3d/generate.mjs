import { THREE, exportGLB, OUT_DIR } from "./lib/glb-export.mjs";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import fs from "fs";
import path from "path";

const FONT_FILE = path.join(process.cwd(), "scripts/3d/fonts/helvetiker_regular.typeface.json");

const fontJson = JSON.parse(fs.readFileSync(FONT_FILE, "utf8"));
const font = new FontLoader().parse(fontJson);

function roundRectShape(width, height, radius) {
  const s = new THREE.Shape();
  const w = width / 2;
  const h = height / 2;
  const r = Math.min(radius, w, h);
  s.moveTo(-w + r, -h);
  s.lineTo(w - r, -h);
  s.quadraticCurveTo(w, -h, w, -h + r);
  s.lineTo(w, h - r);
  s.quadraticCurveTo(w, h, w - r, h);
  s.lineTo(-w + r, h);
  s.quadraticCurveTo(-w, h, -w, h - r);
  s.lineTo(-w, -h + r);
  s.quadraticCurveTo(-w, -h, -w + r, -h);
  return s;
}

// Extrude a 2D shape to thick mm along Z in [0, depth]
function extrudedShape(shape, depth, bevel = 0) {
  const geom = new THREE.ExtrudeGeometry(shape, {
    steps: 1,
    depth,
    bevelEnabled: bevel > 0,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 2,
  });
  return geom;
}

// Text geometry centered, extruded to depth, bottom at z=0
function makeGeom(str, size, depth) {
  const g = new TextGeometry(str, {
    font,
    size,
    depth,
    curveSegments: 5,
    bevelEnabled: false,
  });
  g.computeBoundingBox();
  const b = g.boundingBox;
  const dx = (b.max.x + b.min.x) / 2;
  const dy = (b.max.y + b.min.y) / 2;
  g.translate(-dx, -dy, 0);
  return g;
}

// Teks ukuran mentah (tanpa bevel) untuk mengukur lebar
function textWidth(str, size) {
  const g = makeGeom(str, size, 0);
  g.computeBoundingBox();
  return g.boundingBox.max.x - g.boundingBox.min.x;
}

// ---------- Keychain Nama ----------
function buildKeychainNama(name, size = 6, plaqueDepth = 1.2, textDepth = 1.4, radius = 6, style = "text") {
  const group = new THREE.Group();
  const w = textWidth(name, size);
  const pw = w + 24;
  const ph = size * 2.2;
  const plate = new THREE.Mesh(
    extrudedShape(roundRectShape(pw, ph, radius), plaqueDepth, 0.3),
    new THREE.MeshStandardMaterial({ color: 0x4facfe, roughness: 0.35 })
  );
  plate.position.z = 0;
  group.add(plate);

  const txt = new THREE.Mesh(
    makeGeom(name, size, textDepth),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 })
  );
  txt.position.z = plaqueDepth;
  group.add(txt);

  // Ring atas
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(6, 1.6, 14, 32),
    new THREE.MeshStandardMaterial({ color: 0x4facfe, roughness: 0.3 })
  );
  ring.position.set(0, ph / 2 - 2, plaqueDepth + textDepth);
  group.add(ring);

  // hole circle placeholder untuk orientasi (tidak ada CSG)
  return group;
}

// ----- Classic Clicker -----
function buildClassicClicker(letters, size = 0.9, capDepth = 1.6, keycap = 10, hole = 4) {
  const group = new THREE.Group();
  const matKey = new THREE.MeshStandardMaterial({ color: 0xff7a59, roughness: 0.35 });
  const matTxt = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });

  letters.forEach((ch, i) => {
    const x = (i - (letters.length - 1) / 2) * (keycap + 1.5);
    const cap = new THREE.Mesh(
      extrudedShape(roundRectShape(keycap, keycap, 2.2), capDepth, 0.6),
      matKey
    );
    cap.position.set(x, 0, 0);
    group.add(cap);
    const txt = new THREE.Mesh(makeGeom(ch, size, 0.9), matTxt);
    txt.position.set(x, 0, capDepth);
    group.add(txt);
    // lubang ring di tiap keycap (torus)
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(hole, 0.8, 10, 24),
      matKey
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.set(x, keycap / 2 + 1.5, capDepth / 2);
    group.add(ring);
  });
  return group;
}

// ----- Pencil Topper -----
function buildPencilTopper(text, size = 3, bodyH = 22, bodyR = 7) {
  const group = new THREE.Group();
  const matBody = new THREE.MeshStandardMaterial({ color: 0xffb649, roughness: 0.4 });
  const matTxt = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });

  const body = new THREE.Mesh(new THREE.CylinderGeometry(bodyR, bodyR, bodyH, 40), matBody);
  body.position.z = bodyH / 2;
  group.add(body);

  // lubang bawah (ring penanda)
  const holeRing = new THREE.Mesh(
    new THREE.TorusGeometry(bodyR * 0.55, 1, 12, 32),
    matBody
  );
  holeRing.position.set(0, 0, 0.4);
  group.add(holeRing);

  const txt = new THREE.Mesh(makeGeom(text, size, 1.6), matTxt);
  txt.position.set(0, 0, bodyH - 0.5);
  group.add(txt);

  const cap = new THREE.Mesh(new THREE.SphereGeometry(bodyR, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2), matBody);
  cap.position.z = bodyH;
  group.add(cap);
  return group;
}

// ----- Switch Edition (dua joycon + ring) -----
function buildSwitchEdition(letters, size = 2.6) {
  const group = new THREE.Group();
  const matBody = new THREE.MeshStandardMaterial({ color: 0xff5e5b, roughness: 0.35 });
  const matDark = new THREE.MeshStandardMaterial({ color: 0x2b2b2e, roughness: 0.5 });
  const matTxt = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
  const side = 14, gap = 4, depth = 4;

  [-1, 1].forEach((dir) => {
    const x = dir * (side + gap) / 2;
    const pad = new THREE.Mesh(
      extrudedShape(roundRectShape(side, side, 3), depth, 0.4),
      matBody
    );
    pad.position.set(x, 0, 0);
    group.add(pad);
    // tombol
    const btn = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 1.2, 24), matDark);
    btn.rotation.x = Math.PI / 2;
    btn.position.set(x - dir * 3.2, -3.2, depth);
    group.add(btn);
    const stick = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 2, 24), matDark);
    stick.rotation.x = Math.PI / 2;
    stick.position.set(x + dir * 3.2, 3.4, depth);
    group.add(stick);
  });

  letters.forEach((ch, i) => {
    const x = (i - (letters.length - 1) / 2) * 4.2;
    const txt = new THREE.Mesh(makeGeom(ch, size, 1.2), matTxt);
    txt.position.set(x, 0, depth + 0.6);
    group.add(txt);
  });

  const ring = new THREE.Mesh(new THREE.TorusGeometry(4.5, 1.2, 12, 28), matBody);
  ring.position.set(0, side / 2 + 4, depth);
  group.add(ring);
  return group;
}

// ----- Modular Clicker -----
function buildModularClicker(letters, size = 3, mod = 12, depth = 3) {
  const group = new THREE.Group();
  const matBody = new THREE.MeshStandardMaterial({ color: 0x7a5cff, roughness: 0.35 });
  const matBtn = new THREE.MeshStandardMaterial({ color: 0x2bd9c0, roughness: 0.4 });
  const matTxt = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });

  letters.forEach((ch, i) => {
    const x = (i - (letters.length - 1) / 2) * (mod + 1.5);
    const box = new THREE.Mesh(
      extrudedShape(roundRectShape(mod, mod, 2.4), depth, 0.5),
      matBody
    );
    box.position.set(x, 0, 0);
    group.add(box);
    const btn = new THREE.Mesh(
      extrudedShape(roundRectShape(mod * 0.6, mod * 0.5, 1.6), 1, 0.2),
      matBtn
    );
    btn.position.set(x, 0, depth);
    group.add(btn);
    const txt = new THREE.Mesh(makeGeom(ch, size, 1), matTxt);
    txt.position.set(x, 0, depth + 1.2);
    group.add(txt);
  });
  return group;
}

// ----- Initial Name -----
function buildInitialName(initial, name, iniSize = 14, nameSize = 4.5) {
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: 0x36cf9a, roughness: 0.35 });
  const matTxt = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });

  const ini = new THREE.Mesh(makeGeom(initial, iniSize, 2.4), mat);
  ini.position.set(-10, 4, 0);
  group.add(ini);

  const nm = new THREE.Mesh(makeGeom(name, nameSize, 1.8), matTxt);
  nm.position.set(0, -6, 0);
  group.add(nm);

  const ring = new THREE.Mesh(new THREE.TorusGeometry(5, 1.3, 12, 28), mat);
  ring.position.set(16, 10, 1);
  group.add(ring);
  return group;
}

// ----- Digivice Clicker -----
function buildDigivice(text, size = 3.2) {
  const group = new THREE.Group();
  const matBody = new THREE.MeshStandardMaterial({ color: 0x8fd9ff, roughness: 0.35 });
  const matScreen = new THREE.MeshStandardMaterial({ color: 0x1c1f26, roughness: 0.3, metalness: 0.3 });
  const matTxt = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });

  const w = 30, h = 44, depth = 4;
  const body = new THREE.Mesh(
    extrudedShape(roundRectShape(w, h, 8), depth, 0.5),
    matBody
  );
  group.add(body);

  const screen = new THREE.Mesh(
    extrudedShape(roundRectShape(w * 0.7, h * 0.45, 5), 1.4, 0.2),
    matScreen
  );
  screen.position.z = depth;
  group.add(screen);

  [-1, 0, 1].forEach((i) => {
    const dot = new THREE.Mesh(new THREE.SphereGeometry(1.4, 16, 12), matTxt);
    dot.position.set(i * 6, h * 0.28, depth);
    group.add(dot);
  });

  const txt = new THREE.Mesh(makeGeom(text, size, 1.4), matTxt);
  txt.position.set(0, -h * 0.18, depth + 0.4);
  group.add(txt);

  const ring = new THREE.Mesh(new THREE.TorusGeometry(4.5, 1.2, 12, 28), matBody);
  ring.position.set(0, h / 2 + 3, depth / 2);
  group.add(ring);
  return group;
}

// export GLB
async function run() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  await exportGLB(buildKeychainNama("BACIRARO"), "3d-keychain-nama.glb");
  await exportGLB(buildClassicClicker(["B", "A", "C", "I", "R", "A", "R", "O"]), "3d-classic-clicker.glb");
  await exportGLB(buildPencilTopper("BACIRARO"), "3d-pencil-topper.glb");
  await exportGLB(buildSwitchEdition(["B", "C", "R", "O"]), "3d-switch-clicker.glb");
  await exportGLB(buildModularClicker(["B", "A", "C", "I", "R"]), "3d-modular-clicker.glb");
  await exportGLB(buildInitialName("B", "BACIRARO"), "3d-initial-name.glb");
  await exportGLB(buildDigivice("BACIRARO"), "3d-digivice-clicker.glb");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});