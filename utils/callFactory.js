exports.getSeedId = async (champKey) => {
  try {
    const response = await fetch(
      `https://api2.ultimate-bravery.net/bo/api/ultimate-bravery/v1/classic/dataset?`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        Host: "api2.ultimate-bravery.net",
        Connection: "keep-alive",
        Accept: "application/json, text/plain, */*",
        body: JSON.stringify({
          map: 11,
          level: 30,
          roles: [0],
          language: "en",
          champions: [champKey],
        }),
      }
    );

    const data = await response.json();
    return data.data.seedId;
  } catch (e) {
    console.log(e);
  }
};
