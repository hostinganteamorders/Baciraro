import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import fs from "fs";
import path from "path";

if (typeof globalThis.FileReader === "undefined") {
  globalThis.FileReader = class {
    constructor() {
      this.result = null;
      this.onloadend = null;
    }
    _emit() {
      if (typeof this.onloadend === "function") this.onloadend();
    }
    readAsArrayBuffer(blob) {
      if (blob && typeof blob.arrayBuffer === "function") {
        blob.arrayBuffer().then((ab) => {
          this.result = ab;
          this._emit();
        });
      }
    }
    readAsDataURL(blob) {
      if (blob && typeof blob.arrayBuffer === "function") {
        blob.arrayBuffer().then((ab) => {
          const mime = (blob.type || "application/octet-stream").split(";")[0];
          this.result = `data:${mime};base64,${Buffer.from(ab).toString("base64")}`;
          this._emit();
        });
      }
    }
  };
}

export const OUT_DIR = path.join(process.cwd(), "public/models");

export function exportGLB(group, filename) {
  const scene = new THREE.Scene();
  scene.add(group);
  const exporter = new GLTFExporter();
  return new Promise((resolve, reject) => {
    exporter.parse(
      scene,
      (buf) => {
        fs.writeFileSync(path.join(OUT_DIR, filename), Buffer.from(buf));
        console.log("OK ->", filename);
        resolve();
      },
      (err) => {
        console.error("EXPORT FAIL", filename, err);
        reject(err);
      },
      { binary: true }
    );
  });
}

export { THREE };
