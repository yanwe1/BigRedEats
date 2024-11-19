import path from "path";
import fetch from "node-fetch";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import { getEateryDetails } from "./api/eateryApi";
import { 
    addReview,
    deleteReview,
    updateReview
} from "./api/reviewApi";

const app: Express = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.get("/api/eateryDetails/:eateryId", async (req, res) => {
  console.log("[GET] entering 'eateryDetails/:eateryId' endpoint");
  const eateryId: string = req.params.eateryId;
  // const { userId, rating, comment } = req.body;
  
  try {
    const eateryDetails = await getEateryDetails(eateryId);
    if (eateryDetails === null) {
      res.status(404).send({
        error: `ERROR: eatery with eateryId: ${eateryId} not found in Firestore`,
      });
    } else {
      res.status(200).send({
        message: `SUCCESS retrieved eatery with eateryId: ${eateryId} from the eatery collection in Firestore`,
        data: eateryDetails,
      });
>>>>>>> 17afd207b7a4207f483d47d03c251e213c7cfed8
    }
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/eateryDetails/:eateryId endpoint: ${err}`,
    });
  }
});

// addReview
app.post("/api/addReview/:eateryId", async (req, res) => {
  console.log("[POST] entering '/api/addReview/:eateryId' endpoint");
  const eateryId: string = req.params.eateryId; // get eateryId from the route
  const { userId, rating, comment } = req.body; // eatract review details from the request body
  
  // build review object
  const review = { userId, rating, comment };

  try {
    // save review to firestore
    await addReview(eateryId, review);
    res.status(201).send({
      message: `SUCCESS added review for eateryId: ${eateryId}`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/reviewApi/:eateryId endpoint: ${eateryId}`,
    });
  }
});

// deleteReview
app.delete("/api/deleteReview/:eateryId/:reviewId", async (req, res) => {
  console.log("[DELETE] entering '/api/deleteReview/:eateryId/:reviewId' endpoint");
  const { eateryId, reviewId} = req.params;
  //const eateryId: string =

  try {
    await deleteReview(reviewId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/people endpoint: ${err}`,
    });
  }
});

// updateReview
app.put("/api/updateReview/:eateryId/:reviewId", async (req, res) => {
  console.log("[PUT] entering '/api/updateReview/:eateryId/:reviewId' endpoint");
  const { eateryId} = req.params; // Get eatery ID and review ID from the route
  const {userId, rating, comment } = req.body; // Extract the fields to update from the request body

  try {
    const review = {userId, rating, comment }
    await updateReview(eateryId, review);
    res.status(200).send({
      message: `SUCCESS Updated review with ID ${review} for eateryID: ${eateryId}`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/updateReview/:eateryId endpoint: ${err}`,
    });
  }
});

app.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
  });