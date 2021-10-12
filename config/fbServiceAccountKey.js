const config = {
  type: "service_account",
  project_id: "ecomerce-wallframesng",
  private_key_id: "a54662284b379cb2aa2fe83c994c646cc42220f4",
  private_key: process.env.GOOGLE_PRIVATE_KEY,
  client_email: "firebase-adminsdk-ub0l9@ecomerce-wallframesng.iam.gserviceaccount.com",
  client_id: "111480915301782297548",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ub0l9%40ecomerce-wallframesng.iam.gserviceaccount.com"
};

module.exports = config;