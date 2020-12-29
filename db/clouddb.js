const DB_USER = "jyothish";
const DB_PASSWORD = "BaVcKavME1O3Z7rPg";
const DB_NAME = "linkedinDB";
const CLUSTER_HOST = "@apidemo.as13s.mongodb.net";
exports.DB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${CLUSTER_HOST}/${DB_NAME}?retryWrites=true&w=majority`;