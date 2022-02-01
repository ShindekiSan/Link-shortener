const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb+srv://Maxim:a298925134@cluster0.stw0h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  jwtSecret: 'test project',
  baseUrl: 'https://links-shortener-api.herokuapp.com',
};

export default config;
