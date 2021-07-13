# Create mysql server based on the official image from the dockerhub
FROM mysql:8.0.21

# Add a database & root password
ENV MYSQL_DATABASE timeline
ENV MYSQL_ROOT_PASSWORD=password

# optionnaly, run initial scripts for creating tables 
COPY ./sql-scripts/ /docker-entrypoint-initdb.d/