require("dotenv").config();

const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_CONECTION_STRING);

const db = client.db("myFirstDatabase");
const collection = db.collection("kpfilms");

const limitItemsOnSearchPage = 50;

async function search(searchQuery, searchPage) {
    const skipedItems = searchPage * limitItemsOnSearchPage;

    try {
        const pipeline = [
            {
                $match: {
                    $text: {
                        $search: `\"${searchQuery}\"`,
                    },
                },
            },
            { $sort: { _id: 1, count: -1 } },
            { $skip: skipedItems },
            { $limit: limitItemsOnSearchPage },
        ];

        const results = await collection.aggregate(pipeline).toArray();

        return results;
    } catch (e) {
        console.log(e);
        close();
    }
}

async function autocomplete(autocompleteQuery) {
    try {
        const pipeline = [
            {
                $search: {
                    index: "Names Autocomplete",
                    autocomplete: {
                        query: `${autocompleteQuery}`,
                        path: "name",
                        tokenOrder: "any",
                    },
                },
            },
            { $limit: 10 },
        ];

        const results = await collection.aggregate(pipeline).toArray();

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

module.exports = { connect, close, autocomplete, search };
