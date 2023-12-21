export function shuffleArray(theArray) {
  for (let i = theArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [theArray[i], theArray[j]] = [theArray[j], theArray[i]];
  }
  return theArray;
}

export function formatDate(date) {
  return new Date(date).toLocaleString("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
