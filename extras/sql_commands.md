# SQL DATABASE

*CREATE DATABASE named test | THIS IS NOT WORKING??*
CREATE DATABASE test

## Database test

*sign in with specified user name as postgres*
psql -U postgres
*password postgres*
postgres
*sign into database named test*
\c test

## TABLE users - COLUMNS id name email score

 id |  name  |         email          | score
----+--------+------------------------+-------
  1 | Ember  | fillory@gmail.com      |     11
  2 | Taylor | skitter@parahumans.net |    27
  3 | Sigurd | odinson@valhalla.io    |     11
  4 | Thanos | death@romance.net      |     6
(4 rows)

*QUERY*
SELECT * FROM users;

*ADD COLUMNS*
ALTER TABLE users ADD score smallint;

*UPDATE COLUMN*
UPDATE users SET score = 11 WHERE name='taylor';
UPDATE users SET score = 7 WHERE name='ember' OR name='sigurd';

*QUERY names starting with T*
SELECT 8 FROM users WHERE name LIKE 'T%'; <!-- % means anything after. Char case must match | Taylor, Thanos -->
SELECT 8 FROM users WHERE name LIKE '%r'; <!-- all names ending in r | Ember, Taylor -->

*QUERY SORT DESCENDING*
SELECT * FROM users ORDER BY score DESC;
id |  name  |         email          | score
----+--------+------------------------+-------
  2 | Taylor | skitter@parahumans.net |    27
  1 | Ember  | fillory@gmail.com      |    11
  3 | Sigurd | odinson@valhalla.io    |    11
  4 | Thanos | death@romance.net      |     6

*QUERY SORT ASCENDING*
SELECT * FROM users ORDER BY score ASC;

## SQL FUNCTIONS

*GET COLUMN AVERAGE*
SELECT AVG(score) FROM users;

*GET COLUMN SUM*
SELECT SUM(score) FROM users;

*GET COLUMN COUNT*
SELECT COUNT(name) FROM users;

*CREATE TABLE ID serial auto-increments & secret with variable character up to 100 & name text*
CREATE TABLE login (
 ID serial NOT NULL PRIMARY KEY,
 secret VARCHAR (100) NOT NULL,
 name text UNIQUE NOT NULL
);

*INSERT INTO table login*
INSERT INTO login (secret, name) VALUES ('bananas', 'Monkey King');

*JOIN TABLES BY COLUMN like name or id*
SELECT * FROM users JOIN login ON users.name = login.name;

*DELETE user from users table*
DELETE FROM users WHERE name ='Sally';

*DELETE TABLES*
DROP TABLE login;