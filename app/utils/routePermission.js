const routePermission = {
  admin: {
    apiGET: ["/api/v1/backend/customer/all", "/api/v1/backend/customer/edit"],
    apiPOST: [
      "/api/v1/backend/customer/store",
      "/api/v1/backend/customer/update",
      "/api/v1/backend/customer/destroy",
    ],
  },
  editor: {
    apiGET: ["/api/v1/backend/customer/all", "/api/v1/backend/customer/edit"],
    apiPOST: [
      "/api/v1/backend/customer/store",
      "/api/v1/backend/customer/update",
    ],
  },
  user: {
    apiGET: ["/api/v1/backend/customer/all", "/api/v1/backend/customer/edit"],
    apiPOST: [],
  },
};
 
module.exports = routePermission;
