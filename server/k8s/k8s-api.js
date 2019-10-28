const kClient = require("./k8s-client");

const K_USERNAME = process.env.K_USERNAME || "user_name";
const K_PASSWORD = process.env.K_PASSWORD || "password";

module.exports = {
  loginK8s: async function loginK8s() {
    return kClient.post("/kapis/iam.kubesphere.io/v1alpha2/login", {
      username: K_USERNAME,
      password: K_PASSWORD,
    });
  },
};
