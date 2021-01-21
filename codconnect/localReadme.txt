- local psql default database postgres
- local psql's root id=>postgres=>277312
create database optometry;
create user dbmanager with encrypted password '277312';
grant all privileges on database optometry to dbmanager;
postgres=#\l+ //list all databases
postgres=#select current_database();
postgres=#\dt *.* //list all tables

ERROR IN CONNECTING JDBC CONNECTION
MESSAGE OF ERROR: org.postgresql.util.PSQLException: FATAL: no pg_hba.conf entry for host ...
RESOLVED:
  - open data/pg_hba.conf
  - commented like 
  	under # IPv4 local connections:
    #host    all             all             127.0.0.1/32            md5 
  - added host    all             all             0.0.0.0/0            md5
  - restart service of psql server