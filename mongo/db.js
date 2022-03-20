require("dotenv").config();

const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_CONECTION_STRING);

const db = client.db("myFirstDatabase");
const collection = db.collection("kpfilms");

async function search(searchQuery, searchPage) {
    try {
        const pipeline = [
            {
                $search: {
                    index: "Names Index",
                    text: {
                        query: `${searchQuery}`,
                        path: {
                            wildcard: "*",
                        },
                    },
                },
            },
            { $limit: 10 },
            { $project: { _id: 0, id: 1, name: 1 } },
        ];

        const startTime = new Date();

        const results = await collection.aggregate(pipeline).toArray();

        console.log("Время запроса " + (new Date() - startTime) / 1000 + "s");

        return results;
    } catch (e) {
        console.log(e);
        close();
    }
}

async function connect() {
    try {
        await client.connect();
        console.log("database conected");
    } catch (e) {
        console.log(e);
    }
}
async function close() {
    try {
        await client.close();
        console.log("database disconected");
    } catch (e) {
        console.log(e);
    }
}

module.exports = { connect, close, search };