export const calcKSize = (size: number): string => {
  if (size < 1024) return size + " B";
  if (size < 1024 * 1024) return (size / 1024).toFixed(2) + " KB";
  if (size < 1024 * 1024 * 1024) return (size / (1024 * 1024)).toFixed(2) + " MB";
  return (size / (1024 * 1024 * 1024)).toFixed(2) + " GB";
};


export const calcDuration = (seconds: number) => {
  const total = Math.floor(seconds);

  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;

  let text = "";

  if (hours > 0) text += `${hours} hr `;
  if (minutes > 0) text += `${minutes} min `;
  if (secs > 0) text += `${secs} sec`;

  let display = "";

  if (hours > 0) {
    display = `${hours}:${minutes.toString().padStart(2,"0")}:${secs
      .toString()
      .padStart(2,"0")}`;
  } else {
    display = `${minutes}:${secs.toString().padStart(2,"0")}`;
  }

  return { text: text.trim(), display };
};