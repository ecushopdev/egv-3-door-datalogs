const isJsonString = (jsonStr: string) => {
  try {
    return JSON.parse(jsonStr);
  } catch (err) {
    return false;
  }
};

export default isJsonString;
