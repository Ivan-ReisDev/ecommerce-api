export default {
    port: 3000,
    database: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tlwo60l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    env: "development"     

}