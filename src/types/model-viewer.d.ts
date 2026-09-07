import type { DetailedHTMLProps, HTMLAttributes, Ref } from "react";

type RGB = [number, number, number];

declare global {
  interface ModelViewerMaterial {
    name: string;
    pbrMetallicRoughness: {
      setBaseColorFactor(color: string | RGB): void;
      baseColorFactor: RGB;
    };
  }

  interface ModelViewerModel {
    materials: ModelViewerMaterial[];
  }

  interface ModelViewerElement extends HTMLElement {
    model?: ModelViewerModel;
    src?: string;
  }
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        alt?: string;
        ref?: Ref<ModelViewerElement>;
        "camera-controls"?: string | boolean;
        "auto-rotate"?: string | boolean;
        "rotation-per-second"?: string;
        "shadow-intensity"?: string;
        exposure?: string;
        "camera-orbit"?: string;
        ar?: string | boolean;
        "touch-action"?: string;
        "interaction-prompt"?: string;
        "interaction-prompt-threshold"?: string;
        "on-load"?: (event: Event) => void;
      };
    }
  }
}
