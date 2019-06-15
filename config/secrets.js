// add a .env file with the JWT_Secret you like to use

module.exports = {
  jwtSecret:
    process.env.JWT_Secret || 'learn to code, pay 0$ until you get job'
}