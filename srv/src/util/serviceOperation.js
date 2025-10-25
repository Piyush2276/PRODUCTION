const cds = require("@sap/cds");

const getService = async (sServiceName) => {
  // This line attempts to connect to a service named sServiceName using the cds.connect.to method provided by the CAP runtime.
  const oService = await cds.connect.to(sServiceName);

  //This line returns the retrieved service object(oService) from the function.
  return oService;
};

module.exports = { getService };