const timeMap = new Map<string, string>();

export const getTimeForMessage = (id: string, index: number): string => {
  const key = `${id}-${index}`;
  if (!timeMap.has(key)) {
    const time = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    timeMap.set(key, time);
  }
  return timeMap.get(key) as string;
};
