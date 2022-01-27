const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb+srv://Maxim:a298925134@cluster0.stw0h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  jwtSecret: 'test project',
  baseUrl: 'http://localhost:5000',
};

export default config;
