create user 'timeline'@'localhost' identified by 'password';
grant all on timeline.* to 'timeline'@'localhost';

create table reportResults (
  id INT AUTO_INCREMENT,
  owner VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE,
  file LONGBLOB,
  PRIMARY KEY (id),
  INDEX (owner, date)
);

create table failTests (
  id INT AUTO_INCREMENT,
  owner VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE,
  PRIMARY KEY (id),
  INDEX (owner, date)
);

create table runProgress (
  id INT AUTO_INCREMENT,
  owner VARCHAR(255) NOT NULL,
  instanceIP VARCHAR(255) NOT NULL,
  description TEXT,
  progress FLOAT NOT NULL,
  passed INT NOT NULL,
  failed INT NOT NULL,
  done INT NOT NULL,
  remained INT NOT NULL,
  assigned INT NOT NULL,
  date DATETIME NOT NULL,
  PRIMARY KEY (id),
  INDEX (owner, date)
);

ALTER USER 'timeline'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

