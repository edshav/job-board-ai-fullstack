export function makeInitials(name: string): string {
  // Split the name into parts and take the first letter of each part
  const initials = name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2); // Limit to two initials

  return initials;
}
