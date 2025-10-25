let deployAttributes;
let bearerToken; // Global token

const srvUrl =
  "https://478d7af6trial-478d7af6trial-dev-mynorthwindapp-srv.cfapps.us10-001.hana.ondemand.com";

// 1. Fetch deploy-info and token on page load
axios
  .get(`${srvUrl}/deploy-info`)
  .then((response) => {
    console.log("App Content Digest:", response.data);
    deployAttributes = response.data.deployAttributes;
    return fetchJwtToken(
      deployAttributes.authURL,
      deployAttributes.clientID,
      deployAttributes.clientSecret
    );
  })
  .then((token) => {
    bearerToken = token;
    console.log("Bearer token ready:", bearerToken);
  })
  .catch((error) => {
    console.error("Error during initialization:", error);
  });

// Function to fetch JWT token
async function fetchJwtToken(oauthUrl, oauthClient, oauthSecret) {
  const tokenUrl = `${oauthUrl}/oauth/token?grant_type=client_credentials&response_type=token`;
  const config = {
    headers: {
      Authorization: "Basic " + btoa(`${oauthClient}:${oauthSecret}`),
    },
  };

  try {
    const response = await axios.get(tokenUrl, config);
    console.log("JWT Token fetched successfully:", response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching JWT token:", error);
    throw error;
  }
}

// ================= Northwind Service Calls =================

const nwSrvUrl = `${srvUrl}/odata/v4/catalog`;

// Fetch Categories (expand Products)
function fetchCategories() {
  if (!bearerToken) {
    alert("Token not ready yet. Please wait a few seconds.");
    return;
  }
  axios
    .get(`${nwSrvUrl}/Categories?$expand=Products`, {
      headers: { Authorization: `Bearer ${bearerToken}` },
    })
    .then((response) => {
      const categories = response.data.value || response.data;
      const list = document.getElementById("categories-list");
      list.innerHTML = "";
      categories.forEach((cat) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${cat.CategoryName}</strong> - ${cat.Description || ""}`;
        if (cat.Products) {
          const ul = document.createElement("ul");
          cat.Products.forEach((prod) => {
            const pLi = document.createElement("li");
            pLi.textContent = `Product: ${prod.ProductName}`;
            ul.appendChild(pLi);
          });
          li.appendChild(ul);
        }
        list.appendChild(li);
      });
    })
    .catch((error) => console.error("Error fetching Categories:", error));
}

// Fetch Products (expand Category)
function fetchProducts() {
  if (!bearerToken) {
    alert("Token not ready yet. Please wait a few seconds.");
    return;
  }
  axios
    .get(`${nwSrvUrl}/Products?$expand=Category`, {
      headers: { Authorization: `Bearer ${bearerToken}` },
    })
    .then((response) => {
      const products = response.data.value || response.data;
      const list = document.getElementById("products-list");
      list.innerHTML = "";
      products.forEach((prod) => {
        const li = document.createElement("li");
        li.textContent = `${prod.ProductName} (Category: ${
          prod.Category?.CategoryName || "N/A"
        })`;
        list.appendChild(li);
      });
    })
    .catch((error) => console.error("Error fetching Products:", error));
}

// Fetch Customers (expand Orders)
function fetchCustomers() {
  if (!bearerToken) {
    alert("Token not ready yet. Please wait a few seconds.");
    return;
  }
  axios
    .get(`${nwSrvUrl}/Customers?$expand=Orders`, {
      headers: { Authorization: `Bearer ${bearerToken}` },
    })
    .then((response) => {
      const customers = response.data.value || response.data;
      const list = document.getElementById("customers-list");
      list.innerHTML = "";
      customers.forEach((cust) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${cust.CompanyName}</strong> (${cust.CustomerID})`;
        if (cust.Orders) {
          const ul = document.createElement("ul");
          cust.Orders.forEach((ord) => {
            const oLi = document.createElement("li");
            oLi.textContent = `Order ID: ${ord.OrderID}, Date: ${ord.OrderDate}`;
            ul.appendChild(oLi);
          });
          li.appendChild(ul);
        }
        list.appendChild(li);
      });
    })
    .catch((error) => console.error("Error fetching Customers:", error));
}

// Fetch Orders (expand Customer)
function fetchOrders() {
  if (!bearerToken) {
    alert("Token not ready yet. Please wait a few seconds.");
    return;
  }
  axios
    .get(`${nwSrvUrl}/Orders?$expand=Customer`, {
      headers: { Authorization: `Bearer ${bearerToken}` },
    })
    .then((response) => {
      const orders = response.data.value || response.data;
      const list = document.getElementById("orders-list");
      list.innerHTML = "";
      orders.forEach((ord) => {
        const li = document.createElement("li");
        li.textContent = `Order ID: ${ord.OrderID}, Customer: ${
          ord.Customer?.CompanyName || "N/A"
        }, Date: ${ord.OrderDate}`;
        list.appendChild(li);
      });
    })
    .catch((error) => console.error("Error fetching Orders:", error));
}
