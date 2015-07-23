var models = require('../models/models.js');


// Autoload :id
exports.load = function(req, res, next, quizId) {
	console.info("ID DE LA PREGUNTA: "+quizId);
  models.Quiz.findById(quizId).then(
		function(quiz) {
			console.dir(quiz);
      if (quiz) {
        req.quiz = quiz;
        next();
      } else{next(new Error('No existe quizId=' + quizId))}
    }
  ).catch(function(error){next(error)});
};

// GET /users/:userId/quizes
exports.index = function(req, res) {
  models.Quiz.findAll().then(
    function(quizes) {
      res.render('quizes/index.ejs', {quizes: quizes});
    }
  )
};

// GET /quizes/question
exports.show = function(req, res){
	models.Quiz.findAll().then(function(quiz){
		res.render('quizes/show', {quiz: req.quiz});
		})
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render(
    'quizes/answer',
    { quiz: req.quiz,
      respuesta: resultado
    }
  );
};
