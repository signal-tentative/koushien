import { atom } from "jotai";

const atomUserMode = atom(true); // true=受講生,false=講師
const atomUserModal = atom(false);

export { atomUserMode };
