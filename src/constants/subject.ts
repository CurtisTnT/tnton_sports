export type SubjectType = "nam" | "nu" | "ca_nam_va_nu" | "tre_em";

export const Subject: { [key in SubjectType]: { label: string } } = {
  nam: { label: "Nam" },
  nu: { label: "Nữ" },
  ca_nam_va_nu: { label: "Cả nam và nữ" },
  tre_em: { label: "Trẻ em" },
};

export const subjects = Object.keys(Subject).map((key) => ({
  type: key as SubjectType,
  label: Subject[key as SubjectType].label,
}));
