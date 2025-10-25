//require("dotenv").config();
//const Buffer = require("buffer").Buffer;
const { getService } = require("./src/util/serviceOperation");
const cds = require("@sap/cds"); // Importing the cds module.

const { getDetails } = require("./src/details");

module.exports = cds.service.impl(async (srv) => {
  // Getting the entities from the services.
  const {Categories, Products, Customers, Order_Details, Orders} = srv.entities;

  srv.on("READ", Categories, getDetails);
  srv.on("READ", Products, getDetails);
  srv.on("READ", Customers, getDetails);
  srv.on("READ", Order_Details, getDetails);
  srv.on("READ", Orders, getDetails);

  });