import { Router } from "express";
import { addVacation, deleteVacation, editVacation, getVacationImage, getVacations } from "../5-logic/Vacations-logic";
import fs from 'fs';
export const vacationsRouter = Router();


// 01 - GET ALL VACATIONS PAGINATION +TOTAL LIKES + USERS LIKES
vacationsRouter.get("/vacations", async (req, res, next) => {
  const perPage = +req.query.perPage || 10;
  const page = +req.query.page || 1;
  const id = +req.query.id;
  let filters = {}
  if(req.query.filters) {
    filters = JSON.parse(req.query.filters as string);
  }


  try {
    const vacations = await getVacations(perPage, page, id, filters);
    return res.json(vacations);
  } catch (error) {
    next(error);
  }
});

// 04 - DELETE VACATION
vacationsRouter.delete('/vacations/:id', async (req, res, next) => {
  const { id } = req.params;
  const deleteVac = await deleteVacation(+id);
  res.json(deleteVac)
})


//05 - EDIT VACATION
vacationsRouter.put('/vacations/:id', async (req, res, next) => {

  const { id } = req.params;
  const { destination, description, startDate, endDate, price, image} = req.body;

  const file:any = (req.files && req.files.imageFile) ? req.files.imageFile : null;
  if(file){
   
      const path = './images/' + file.name;
      fs.writeFile(path, file.data, (error) => {
      if (error) {
        console.error(error);
      }
      console.log('File saved to ' + path);
    });
  }
  const result = await editVacation(+id, destination, description, startDate, endDate, price, image);
  res.json({ message: 'Vacation updated successfully!', result });
});

// 06 - ADD VACATION
vacationsRouter.post('/vacations', async (req, res, next) => {

  try {

    const { destination, description, startDate, endDate, price, image } = req.body;
    
    const file:any = (req.files && req.files.imageFile) ? req.files.imageFile : null;
    if(file){
     
        const path = './images/' + file.name;
        fs.writeFile(path, file.data, (error) => {
        if (error) {
          console.error(error);
        }
        console.log('File saved to ' + path);
      });
    }
    
    const result = await addVacation(destination, description, startDate, endDate, price, image);
    console.log( 'add vacation' ,result)
    res.status(201).json({ message: 'Vacation added successfully!', vacationId: result });
  } catch (error) {
    res.status(500).json({ message: 'Error adding vacation' });
  }
})

vacationsRouter.get('/vacationImage/:id', async (req, res, next) => {

  const { id } = req.params;

  const vacationImageBlob = await getVacationImage(+id);

  if (vacationImageBlob){
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Disposition', 'inline');
    res.send(Buffer.from(vacationImageBlob));
    
  } else {
    res.status(404).end();
  }


})


// GET VACATION BY ID
// vacationsRouter.get('/vacations/:id([0-9]+)', async (req, res, next) => {
//   const { id } = req.params;
//   const vacation = await getVacation(+id);
//   res.json(vacation)
// })


// vacationsRouter.get('/vacations/:image/:id([0-9]+)', async (req, res, next) => {

//   const { id } = req.query;

//   try {
//     const image = await uploadImage(+id);
//     res.set('Content-Type', 'image/jpeg'); // Set the content type to image/jpeg
//     res.send(image);
//     // res.json(image)
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });