const express = require('express');
const cors = require('cors');

function createRouter(db) {
  const router = express.Router();
  router.all('*', cors());
  // The routes are defined here
  // Add new record into the database
  router.post('/event', (req, res, next) => {
    const owner = "tester";
    db.query(
      'INSERT INTO reportResults (owner, name, description, date) VALUES (?,?,?,?)',
      [owner, req.body.name, req.body.description, new Date(req.body.date)],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  // Get database records
  router.get('/event', function (req, res, next) {
    const owner = "tester";
    db.query(
      'SELECT id, name, description, date FROM reportResults WHERE owner=? ORDER BY date LIMIT 10 OFFSET ?',
      [owner, 10*(req.params.page || 0)],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.get('/eventFileOnly/:id', function (req, res, next) {
    const owner = "tester";
    const id = req.params.id;
    db.query(
      'SELECT id, name, description, date, file FROM reportResults WHERE id=?',
      [id],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.get('/failTests', function (req, res, next) {
    const owner = "tester";
    db.query(
      'SELECT name, description, date FROM failTests WHERE owner=? ORDER BY date',
      [owner],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.get('/testProgress', function (req, res, next) {
    const owner = "tester";
    db.query(
      "SELECT instanceIP, description, progress, passed, failed, done, remained, assigned, date FROM runProgress WHERE owner=? AND NOT instanceIP='currentProgress' ORDER BY date",
      [owner],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.get('/totalProgress', function (req, res, next) {
      const owner = "tester";
      db.query(
        "SELECT instanceIP, description, progress, passed, failed, done, remained, assigned, date FROM runProgress WHERE owner=? AND instanceIP='currentProgress' ORDER BY date",
        [owner],
        (error, results) => {
          if (error) {
            console.log(error);
            res.status(500).json({status: 'error'});
          } else {
            res.status(200).json(results);
          }
        }
      );
    });

  // Update database records
  router.put('/event/:id', function (req, res, next) {
    const owner = "tester";
    db.query(
      'UPDATE reportResults SET name=?, description=?, date=? WHERE id=? AND owner=?',
      [req.body.name, req.body.description, new Date(req.body.date), req.params.id, owner],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  // Delete database record
  router.delete('/event/:id', function (req, res, next) {
    const owner = "tester";
    db.query(
      'DELETE FROM reportResults WHERE id=? AND owner=?',
      [req.params.id, owner],
      (error) => {
        if (error) {
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;

