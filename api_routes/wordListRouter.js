const wordListRouter = require('express').Router();
const fs = require('fs');
const path = require('path');
const uuid = require('node-uuid');
const _ = require('lodash');

const WORD_LIST_INDEX = path.join(__dirname, '../', './datafiles/wordListIndex.json');


wordListRouter.route('/wordlists')
  //---------------------------------------------------
  //--A get to api/wordlists will return the wordListIndex.json
  //--file as a javascript object.
  //---------------------------------------------------
  .get((req, res) => {
    fs.readFile(WORD_LIST_INDEX, (err, data) => {
      res.setHeader('Cache-Control', 'no-cache');
      //Looks like .send without the JSON.parse does the same as res.json(...)
      //res.send(data);
      //res.json -This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using JSON.stringify().
      res.json(JSON.parse(data));
    });
  });

  wordListRouter.route('/wordlists/:wordList')
  //---------------------------------------------------
  //--A get to api/wordlists/:wordList will read the :wordList (req.params.wordList)
  //--passed and send it back as a javascript object.
  //---------------------------------------------------
  .get((req, res) => {
    //console.log(req.params.wordList);
    //console.log(path.resolve(__dirname, `../dataFiles/${req.params.wordList}.json`));
    fs.readFile(path.resolve(__dirname, `../dataFiles/${req.params.wordList}.json`), (err, data) => {
      wordList = _.sortBy(JSON.parse(data), 'word');
      res.setHeader('Cache-Control', 'no-cache');
      res.json(wordList);
    });
  })
	//---------------------------------------------------
	//--A delete to api/wordlists/:wordList will read the :wordList (req.params.wordList)
	//--passed and the use the req.body.ids array to delete the passed ids/words from the file
	//--Then it will write the file back to disk.
	//---------------------------------------------------
	.post((req, res)=> {
		const WORD_LIST_FILE = path.resolve(__dirname, `../dataFiles/${req.params.wordList}.json`);
		//expexting a body with property of "ids" --> req.body.ids
		//this will be an array of word ids to delete
		let idsToDelete = req.body.idsToDelete;
		console.log(idsToDelete, req.params.wordList);
		//Read the file that we will be deleting words from
		fs.readFile(WORD_LIST_FILE, (err, data) => {
      wordList = _.sortBy(JSON.parse(data), 'word');
			let newWordList = _.filter(wordList, obj => {
				//want to remove any words with ids that are in the array "idsToDelete"
				//thus if indexOf returns -1, it means the id we are checking is NOT in the delete list
				return (_.indexOf(idsToDelete, obj.id) === -1);
			});
			fs.writeFile(WORD_LIST_FILE, JSON.stringify(newWordList), (err) => {
				if (err) {
					console.log(`Error writing ${WORD_LIST_FILE}!`, err);
				}
				console.log(`${WORD_LIST_FILE} written successfully!`);
			})
      res.setHeader('Cache-Control', 'no-cache');
      res.json(newWordList);
    });
	});

  //---------------------------------------------------
  //--A POST to api/variables will cause the object sent
  //--to be added to the qvvariables.json file.
  //--A new object with just the application that the
  //--variable was added to will be returned
  //---------------------------------------------------
//   .post((req, res) => {
//   	//If we send an JS object to a post, req.body will have the object in it.
//     fs.readFile(DATA_FILE, (err, data) => {
//       const variables = JSON.parse(data);

//       const newVar = {
//   			id: uuid.v4(),
//   			application: req.body.application,
//   			name: req.body.name,
//   			expression: req.body.expression,
//   			description: req.body.description,
//   			notes: req.body.notes || '',
//   			group: req.body.group,
//   			locked: req.body.locked,
//   			createDate: req.body.createDate,
//   			modifyDate: '',
//   			createUser: req.body.createUser,
//         modifyUser: ''
//   		};

//   		//--add this new variable object too the variables array
//       variables.push(newVar);
//   		console.log('newvar', newVar);
//       //write the variables array back to disk
//       fs.writeFile(DATA_FILE, JSON.stringify(variables), () => {
//       	let applicationVars = variables.filter(qvVar => qvVar.application.toLowerCase() === req.body.application.toLowerCase());
//         res.setHeader('Cache-Control', 'no-cache');
//         //return the variables file so application can update it's
//         res.json(applicationVars);
//       });
//     });
//   })
//   //---------------------------------------------------
//   //--A PUT to api/variables will cause the object sent
//   //--to be updated in the qvvariables.json file.
//   //--an empty object {} will be returned
//   //---------------------------------------------------
//   /**
//    * @api {put} /api/variables update a single variable object
//    * @apiParam(data) {Object} QVVariableObject QV Variable Object.
//    * @apiSuccess(return) {Object} emptyObject An Empty Object.
//    */
//   .put((req, res) => {
//     fs.readFile(DATA_FILE, (err, data) => {
//       const variables = JSON.parse(data);
//       //Find the variable to be updated
//       variables.forEach(qvVar => {
//       	if (qvVar.id === req.body.id) {
//   				qvVar.application = req.body.application;
//   				qvVar.name = req.body.name;
//   				qvVar.expression = req.body.expression;
//   				qvVar.description = req.body.description;
//   				qvVar.notes = req.body.notes;
//   				qvVar.group = req.body.group;
//   				qvVar.locked = req.body.locked;
//   				qvVar.modifyDate = req.body.modifyDate,
//           qvVar.modifyUser = req.body.modifyUser;
//       	}
//       });
//       //write the variables array back to disk
//       fs.writeFile(DATA_FILE, JSON.stringify(variables), () => {
//         res.setHeader('Cache-Control', 'no-cache');
//         //return the variables file so application can update it's
//         res.json({});
//         res.end();
//       });
//     });
//   });

// variablesRouter.route('/variables/:id')
//   //---------------------------------------------------
//   //--A DELETE to api/variables will cause the object with
//   //--the id sent to be deleted
//   //--an empty object {} will be returned
//   //---------------------------------------------------
//   .delete((req, res) => {
//     fs.readFile(DATA_FILE, (err, data) => {
//       const variables = JSON.parse(data);
//       //Filter and remove the variable to be deleted
//       const varDeleted = variables.filter(qvVar => qvVar.id !== req.params.id);
//       //write the variables array back to disk
//       fs.writeFile(DATA_FILE, JSON.stringify(varDeleted), () => {
//         res.setHeader('Cache-Control', 'no-cache');
//         //return the variables file so application can update it's
//         res.json({});
//         res.end();
//       });
//     });
//  });


module.exports = wordListRouter;
