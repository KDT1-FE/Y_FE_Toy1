export function formatDepartment(department: string | undefined) {
  switch (department) {
    case "Product Manager":
      return "PM";
    case "Front-end Developer":
      return "FE";
    case "Back-end Developer":
      return "BE";
    case "UI/UX":
      return "UI/UX";
    default:
      return department;
  }
}
