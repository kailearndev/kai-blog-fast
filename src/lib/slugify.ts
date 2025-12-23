/**
 * Converts a string into a URL-friendly slug.
 * @param {string} str The input string.
 * @returns {string} The slugified string.
 */
export function slugify(str: string): string {
  // Convert to lowercase and remove leading/trailing whitespace
  str = str.toLowerCase().trim();

  // Replace special characters (e.g., accented letters) with their basic ASCII equivalent
  const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;đ";
  const to = "aaaaeeeeiiiioooouuuunc------d";
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  // Normalize and remove non-alphanumeric characters, spaces, and hyphens
  str = str
    .normalize("NFD") // splits accented letters into base letter and accent
    .replace(/[\u0300-\u036f]/g, "") // removes accent marks
    .replace(/[^a-z0-9 -]/g, "") // remove all non-alphanumeric chars except space and hyphen
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-") // replace multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, ""); // remove leading or trailing hyphens

  return str;
}

// Example Usage:
