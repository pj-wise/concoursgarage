export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "number" | "url" | "textarea" | "select";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  autoComplete?: string;
  half?: boolean;
};

export type FormKind = "rsvp" | "car-submission" | "inquiry";

export const FORM_SUBJECTS: Record<FormKind, string> = {
  rsvp: "Cars & Coffee RSVP",
  "car-submission": "Cars & Coffee — Car Submission",
  inquiry: "Website inquiry",
};

const contactFields: FieldDef[] = [
  { name: "name", label: "Full name", required: true, autoComplete: "name" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", half: true },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", half: true },
];

export const FORMS: Record<FormKind, FieldDef[]> = {
  rsvp: [
    ...contactFields,
    {
      name: "guests",
      label: "Number of guests (including you)",
      type: "select",
      required: true,
      options: ["1", "2", "3", "4"],
      half: true,
    },
    { name: "arrivingIn", label: "What will you be driving?", placeholder: "Optional", half: true },
    { name: "notes", label: "Anything we should know?", type: "textarea" },
  ],
  "car-submission": [
    ...contactFields,
    { name: "year", label: "Year", type: "number", required: true, half: true },
    { name: "make", label: "Make", required: true, half: true },
    { name: "model", label: "Model / trim", required: true, half: true },
    { name: "color", label: "Color", half: true },
    { name: "photos", label: "Link to photos or Instagram", type: "url", placeholder: "https://" },
    {
      name: "story",
      label: "Tell us about the car",
      type: "textarea",
      required: true,
      placeholder: "History, provenance, modifications — whatever makes it special.",
    },
  ],
  inquiry: [
    ...contactFields,
    {
      name: "topic",
      label: "I'm interested in",
      type: "select",
      required: true,
      options: ["Private storage", "A private tour", "Concours detailing", "Maintenance & vehicle care", "Concierge services", "Something else"],
    },
    { name: "vehicles", label: "Vehicle(s)", placeholder: "Year, make and model" },
    { name: "message", label: "Message", type: "textarea" },
  ],
};

/** Plain-text body shared by the email sent from the server and the mailto fallback. */
export function formatSubmission(kind: FormKind, values: Record<string, string>): string {
  return FORMS[kind]
    .filter((f) => values[f.name]?.trim())
    .map((f) => `${f.label}: ${values[f.name].trim()}`)
    .join("\n");
}
