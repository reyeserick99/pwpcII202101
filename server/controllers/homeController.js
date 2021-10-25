/* eslint-disable prettier/prettier */
const index = (req, res) => {
  res.render('index', {
    title: 'ProjNotes',
  });
};

const greeting = (req, res) => {
    res.status(200).json({
        message: 'Hola Champ del FullStack Web',
    });
};

export default {
  index,
  greeting,
};
