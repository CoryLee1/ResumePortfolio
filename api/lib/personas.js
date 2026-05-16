import { prompts } from "./prompts/index.js";

/** @typedef {'hr' | 'curator' | 'immigration'} PersonaId */

export const PERSONAS = {
  hr: {
    id: "hr",
    label: "HR / RECRUITER",
    preset: "recruiter",
    get system() {
      return prompts.personas.hr();
    },
  },
  curator: {
    id: "curator",
    label: "CURATOR / GALLERY",
    preset: "curator",
    get system() {
      return prompts.personas.curator();
    },
  },
  immigration: {
    id: "immigration",
    label: "IMMIGRATION / EB-1",
    preset: "investor",
    get system() {
      return prompts.personas.immigration();
    },
  },
};

export function getPersona(id) {
  return PERSONAS[id] ?? PERSONAS.hr;
}
