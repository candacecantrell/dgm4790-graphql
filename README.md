Clone this repository:

```
git clone https://github.com/thortek/dgm4790-graphql-server
```

Change into project's root directory and install:

```
cd dgm4790-graphql-server
npm install
```

Note that this also generates Prisma Client JS into `node_modules/@prisma/client` via a `postinstall` hook of the `@prisma/client` package from your `package.json`.

<Details><Summary><strong>Follow these steps to start/restart from scratch</strong></Summary>

If you have an existing Docker container running and want to restart from scratch, run the `nuke` npm script:

```
npm run nuke
```

Create a new database instance and migrate it by running the `createDB` npm script:

```
npm run createDB
```

Generate the Prisma Client code by running the `generate` npm script:

```
npm run generate
```

Seed the database by running the `seed` npm script:

```
npm run seed
```
</Details>

### 2. Start the GraphQL server

Launch your GraphQL server with this command:

```
npm start
```

Navigate to [http://localhost:4000](http://localhost:4000) in your browser to explore the API of your GraphQL server in a [GraphQL Playground](https://github.com/prisma/graphql-playground).

### 3. Using the GraphQL API

The schema that specifies the API operations of your GraphQL server is defined in [`./schema.graphql`](./schema.graphql). Below are a number of operations that you can send to the API using the GraphQL Playground.

Feel free to adjust any operation by adding or removing fields. The GraphQL Playground helps you with its auto-completion and query validation features.

#### Retrieve all cassettes, title, artist, price, genre

```graphql
query allCassettes {
  Cassettes {
    title
    artist
    price
    genre
  }
}
```

<Details><Summary><strong>See more API operations</strong></Summary>

#### Create a new cassette

```graphql
mutation createCassette {
  createCassette(title: "New cassette",
    genre: "New genre",
  artist: "New artist",
  price: 19.00,
}
```

#### Update a cassette

```graphql
mutation updateCassette {
  updateCassette(id: __CASSETTE_ID__,
    title: "Updated title",
    artist: "Updated artist",
    genre: "Updated genre",
    price: 15.00,
}
```

#### Delete a specific cassette by id

```graphql
mutation deleteOneCassette {
  deleteOneCassette(where: {
    id: __CASSETTE_ID__
  }) {
    id
    title
  }
}
```

> **Note**: Replace CASSETTE_ID with actual cassette id & price must added as be float type. 

#### Search genres & titles with searchstring

```graphql
query filterCassettes {
  Cassette(searchString: "pop") {
    id
    title
    artist
    genre
    price
  }
}
```

#### Retrieve a single cassette by its id

```graphql
query oneCassette {
  Cassette(id: __CASSETTE_ID__) {
    title
    artist
    id
  }
}
```

> **Note**: You need to replace the `__CASSETTE_ID__` placeholder with an actual `id` from a `Cassette` item. You can find one e.g. using the `allCAssettes` query.

</Details>
