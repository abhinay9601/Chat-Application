export default {
  APPLICATION_PORT:80, // Your Free Port For this server
  APP_KEY: 'gglgm"7_"Tx?MT-eyY_.[EoElhX6Fl', // unique string for jwt
  JWT_ALGORITHM: "RS256",
  JWT_EXPIRY: 24 * 60 * 60 * 1000,
  DB_URL: "mongodb+srv://ashtu123:ashtu123@cluster0.xzi3u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  BASE_DIR: "/Users/admin/Desktop/mypay/mypay-payment",
  MQTT_CONNECTION: "mqtt://localhost:1883", //Mqtt C
  VIEWS: __dirname + "/views/",
  USER_LEVEL: ["superAdmin", "admin", "client", "manager", "agent"],
  MAILER_SERVICE_LIST: ["nodemailer"],
  ACTIVE_MAILER_SERVICE: "nodemailer",
  MAILER_CREDENTIAL: {
    user: "ultimate.leadswell@gmail.com",
    pass: "ultesting@123",
  },
  PORTAL_URL: "https://getstarted.stringcans.com/dashboard"
};
