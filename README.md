# Web Components for Knowledge Graphs 

Live Demo: <https://raw.githack.com/ontopic-vkg/webcomp-kg/master/example/index.html>


## Table of contents

- [Usage](#usage)
- [Gettings started](#getting-started)
- [Tests and linting](#tests-and-linting)
- [Deployment](#deployment)
- [Docker environment](#docker-environment)
- [Information](#information)

## Usage


Include the webcompscript files `webcomp-kg.js` and `webcomp-kg.css`  in your HTML and define the web components like below. 
Three Web Components `<kg-map>`, `<kg-gallery>`, and `<kg-table>` are defined. 
The query needs to be encoded for hmtl to be used between tags query. 


```html
<body>
<script src="webcomp-kg.js"></script>
  <link rel="stylesheet" href="webcomp-kg.css">
<kg-map endpoint='https://sparql.opendatahub.bz.it/sparql'>
  <query><pre>PREFIX schema: &lt;http://schema.org/&gt;
    PREFIX geo: &lt;http://www.opengis.net/ont/geosparql#&gt;
    SELECT ?h ?pos ?posLabel ?posColor
    WHERE &#123;
    ?h a schema:LodgingBusiness ;
       geo:asWKT ?pos ;
       schema:name ?posLabel ;
       schema:address ?a .
  FILTER (lang(?posLabel) = 'de')
  # Colors
  OPTIONAL &#123;
  ?h a schema:Campground .
  BIND('chlorophyll,0.5' AS ?posColor) # Green
  &#125;
  OPTIONAL &#123;
  ?h a schema:BedAndBreakfast .
  BIND('viridis,0.1' AS ?posColor) # Purple
  &#125;
  OPTIONAL &#123;
  ?h a schema:Hotel .
  BIND('jet,0.3' AS ?posColor) # Light blue
  &#125;
  OPTIONAL &#123;
  ?h a schema:Hostel .
  BIND('jet,0.8' AS ?posColor) # Red
  &#125;
  &#125;
  LIMIT 500</pre></query>
</kg-map>
</body>
```

Two other We 

### Attributes

#### endpoint

The SPARQL endpoint

Type: string


#### query

The SPARQL query

Type: int

## Getting started

These instructions will get you a copy of the project up and running
on your local machine for development and testing purposes.

### Prerequisites

To build the project, the following prerequisites must be met:

- Node 12 / NPM 6

For a ready to use Docker environment with all prerequisites already installed and prepared, you can check out the [Docker environment](#docker-environment) section.

### Source code

Get a copy of the repository:

```bash
ToDo: git clone https://github.com/ontopic-vkg/webcomp-kg.git
```

Change directory:

```bash
cd webcomp-kg/
```

### Dependencies

Download all dependencies:

```bash
npm install
```

### Build

Build and start the project:

```bash
npm run start
```

The application will be served and can be accessed at [http://localhost:4200](http://localhost:4200).

## Tests and linting

The tests and the linting can be executed with the following commands:

```bash
npm run test
npm run lint
```

## Deployment

To create the distributable files, execute the following command:

```bash
npm run build
```

## Docker environment

For the project a Docker environment is already prepared and ready to use with all necessary prerequisites.

These Docker containers are the same as used by the continuous integration servers.

### Installation

Install [Docker](https://docs.docker.com/install/) (with Docker Compose) locally on your machine.

### Dependenices

First, install all dependencies:

```bash
docker-compose run --rm app /bin/bash -c "npm install"
```

### Start and stop the containers

Before start working you have to start the Docker containers:

```
docker-compose up --build --detach
```

After finished working you can stop the Docker containers:

```
docker-compose stop
```

### Running commands inside the container

When the containers are running, you can execute any command inside the environment. Just replace the dots `...` in the following example with the command you wish to execute:

```bash
docker-compose run --rm app /bin/bash -c "..."
```

Some examples are:

```bash
docker-compose run --rm app /bin/bash -c "npm run test"
```

## Information

### Support

For support, please contact [info@opendatahub.bz.it](mailto:info@opendatahub.bz.it).

### Contributing

If you'd like to contribute, please follow the following instructions:

- Fork the repository.

- Checkout a topic branch from the `development` branch.

- Make sure the tests are passing.

- Create a pull request against the `development` branch.

A more detailed description can be found here: [https://github.com/noi-techpark/documentation/blob/master/contributors.md](https://github.com/noi-techpark/documentation/blob/master/contributors.md).

### Documentation

More documentation can be found at [https://opendatahub.readthedocs.io/en/latest/index.html](https://opendatahub.readthedocs.io/en/latest/index.html).

### Boilerplate

The project uses this boilerplate: [https://github.com/noi-techpark/webcomp-boilerplate](https://github.com/noi-techpark/webcomp-boilerplate).

### License

The code in this project is licensed under the Apache 2 license. See the [LICENSE.md](LICENSE.md) file for more information.
