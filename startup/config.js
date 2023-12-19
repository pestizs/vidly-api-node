import config from "config";

export default function configureApp() {
  //----Configuration
  console.log("Application Name: " + config.get("name"));
  console.log("Mail Server: " + config.get("mail.host"));
  //console.log("Mail Password: " + config.get("mail.password"));

  // Setting env variables from terminal(powershell)
  //   $env:NODE_ENV="development"
  //   $env:app_password=1234
  //   $env:DEBUG = 'app:startup' OR $env:DEBUG = 'app:*' to see all debugging

  // Storing secrets in Environment Variables
  // $env:vidly_jwtPrivateKey=54321
  if (!config.get("jwtPrivateKey")) {
    console.error("FATAL ERROR: jwtPrivateKey is not defined!");
    process.exit(1);
  }
}
