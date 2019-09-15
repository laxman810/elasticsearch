![](Elasticsearch.png)

#	ELASTICSEARCH

*	Elasticsearch is a real-time distributed and open source full-text search and analytics engine.
*	It allows you to store, search, and analyze big volumes of data quickly and in near real time.
*	Elasticsearch is open source developed in Java
*	open source search server base on Apache lucene
*	cross-platform
*	big focus on scalability
*	Design to take data from any source, analyze it and search throught it
*	communication with the search server is done through a HTTP REST API
*	schema-less JSON document
*	near real-time search
* 	example : any store that contains lot of products and user search for that products
*	A cluster is a collection of one or more nodes (servers) that together holds your entire data and provides federated 
	indexing and search capabilities across all nodes.
*	A node is a single server that is part of your cluster, stores your data, and participates in the cluster’s indexing 
	and search capabilities. Just like a cluster, a node is identified by a name which by default is a random 
	Universally Unique IDentifier (UUID) that is assigned to the node at startup. 
*	An index is a collection of documents that have somewhat similar characteristics. 
*	A type used to be a logical category/partition of your index to allow you to store different types of documents in the same index
*	A document is a basic unit of information that can be indexed. For example
*	Elasticsearch provides the ability to subdivide your index into multiple pieces called shards. 	
*	Elasticsearch requires at least Java 8.
*	two way of query search : 1) Query String 2) Query DSL
*	type of query : 1) Leaf	2) coumpound query 3) Full Text 4) Joining query 5) geo query


#	Elasticsearch Installation

*	Install Java
*	curl -L -O https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-6.1.1.tar.gz
*	tar -xvf elasticsearch-6.1.1.tar.gz
*	cd elasticsearch-6.1.1/bin
*	./elasticsearch -Ecluster.name=my_cluster_name -Enode.name=my_node_name

#	Kibana Installation

*	sudo apt-get update
*	sudo apt-get install -y wget
*	wget -qO - https://packages.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
*	echo "deb http://packages.elastic.co/kibana/4.5/debian stable main" | sudo tee -a /etc/apt/sources.list
*	sudo apt-get update && sudo apt-get install kibana
*	sudo update-rc.d kibana defaults 95 10
*	sed -ri "s;^(\#\s*)?(elasticsearch\.url:).*;\2 'http://elasticsearch:9200';" /opt/kibana/config/kibana.yml
*	export PATH=/opt/kibana/bin:$PATH


check cluster health
---------------------
`curl -XGET 'localhost:9200/_cat/health?v&pretty'
GET /_cat/health?v`


List All Indices
------------------
`curl -XGET 'localhost:9200/_cat/indices?v&pretty'`
`GET /_cat/indices?v`


create an index named customer
----------------------------------
`PUT /customer?pretty`
`curl -XPUT 'localhost:9200/customer?pretty&pretty'`


get all indexes 
---------------
`GET /_cat/indices?v`
`curl -XGET 'localhost:9200/_cat/indices?v&pretty'`


create document in customer index
----------------------------------
`PUT /customer/doc/1?pretty
{
  "name": "Laxman Tukadiya"
}`
`curl -XPUT 'localhost:9200/customer/doc/1?pretty&pretty' -H 'Content-Type: application/json' -d'
{
  "name": "Laxman Tukadiya"
}
'`

retrive docunment from customer index
--------------------------------------
`GET /customer/doc/1?pretty`
`curl -XGET 'localhost:9200/customer/doc/1?pretty&pretty'`


Delete an index
-----------------
`DELETE /customer?pretty`
`curl -XDELETE 'localhost:9200/customer?pretty&pretty'`


updating Document
-----------------
`POST /customer/doc/1/_update?pretty
{
  "doc": { "name": "Laxman Tukadiya" }
}`
`curl -XPOST 'localhost:9200/customer/doc/1/_update?pretty&pretty' -H 'Content-Type: application/json' -d'
{
  "doc": { "name": "Laxman Tukadiya" }
}
'`

Deleting Documents
-------------------
`DELETE /customer/doc/2?pretty`
`curl -XDELETE 'localhost:9200/customer/doc/2?pretty&pretty'`



=>	What is an index in ElasticSearch ? 
*	An index is similar to a table in relational databases. 
	The difference is that relational databases would store actual values, which is optional in ElasticSearch.
	An index can store actual and/or analyzed values in an index.
	
=>	What is a document in ElasticSearch ?
*	A document is similar to a row in relational databases.
*	The difference is that each document in an index can have a different structure (fields), but should have same data 
	type for common fields.

=>	Does ElasticSearch have a schema ?
*	Yes, ElasticSeach can have mappings which can be used to enforce schema on documents.

=>	What is a document type in ElasticSearch ?
*	A document type can be seen as the document schema / dynamic mapping definition, which has the mapping of all the 
	fields in the document along with its data types.

=>	What is indexing in ElasticSearch ?
*	The process of storing data in an index is called indexing in ElasticSearch. Data in ElasticSearch can be dividend into 
	write-once and read-many segments. Whenever an update is attempted, a new version of the document is written to the index.
	
=>	What is a node in ElasticSearch ?
*	Each instance of ElasticSearch is called a node. Multiple nodes can work in harmony to form an ElasticSearch Cluster.


=>	What is a shard in ElasticSearch ?
*	Data in an index can be divided into multiple partitions, each handled by a separate node (instance) of ElasticSearch. 
	Each such partition is called a shard. By default an ElasticSearch index has 5 shards.
	
=>	What is a replica in ElasticSearch ?
*	Each shard in ElasticSearch has 2 copy of the shard. These copies are called replicas. 
	They serve the purpose of high-availability and fault-tolerance.

=>	What Are The Basic Operations You Can Perform On A Document ?
*	INDEXING A DOCUMENT USING ELASTICSEARCH.
*	FETCHING DOCUMENTS USING ELASTICSEARCH.
*	UPDATING DOCUMENTS USING ELASTICSEARCH.
*	DELETING DOCUMENTS USING ELASTICSEARCH.

=>	What is the query language of ElasticSearch ?
*	ElasticSearch uses the Apache Lucene query language, which is called Query DSL.

=>	Elasticsearch Use Cases
*	Logging and Log Analysis
*	Scraping and Combining Public Data
*	Full Text Search
*	Event Data and Metrics
*	Visualizing Data


#	Advantages of using elastic search

*	Lots of search options
*	Lightweight
*	Supports Big Data
*	Build on top of lucene
*	Full-text search                                           
*	Fuzzy Searching
*	Autocompletion & Instant Search
*	Document-oriented
*	Speed
*	Scalability
*	Structured search
*	Data record
*	Query Fine Tuning
*	Restful API
*	Distributed approach
*	Use of faceting
*	Multi-Tenancy

#  disadvantages of using Elasticsearch

*	ES is not an ACID compliant system
*	ES does not have any built-in authentication or authorization system
*	ES isn't a relational database and hence if your data would benefit from things like foreign-key constaints and 
	the like ES is not a good choice as your primary data store
	
	
	
#	Example in NodeJs


```js
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
//  log: 'trace'
});

client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

client.search({
  q: 'Laxman'
}).then(function (body) {
  var hits = body.hits.hits;
}, function (error) {
  console.trace(error.message);
});

client.search({
  index: 'customer',
  type: 'external',
  body: {
    query: {
      match: {
        body: 'Laxman'
      }
    }
  }
}).then(function (resp) {
    var hits = resp.hits.hits;
}, function (err) {
    console.trace(err.message);
});
```