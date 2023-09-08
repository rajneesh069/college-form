const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://127.0.0.1:27017/reviewDB");

//Defining Schema 
const reviewSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    collegeId: {
        type: String,
        required: true,
    },
    review: {
        type: String,
    },
});

const reviews = mongoose.model("review", reviewSchema);



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    const { email, collegeId, review } = req.body;
    const newReview = reviews({
        email: email,
        collegeId: collegeId,
        review: review,
    });
    //OR
    // const newReview = new review({
    //     email,
    //     collegeId,
    //     review,
    // });
    newReview.save()
        .then((savedReview) => {
            console.log("Review saved successfully", savedReview);
            res.redirect("/successfulSubmission");
        })
        .catch((error) => {
            console.log("Error saving the review", error);
            res.redirect("/failSave");
        });

});

app.get("/successfulSubmission", (req, res) => {
    res.sendFile(__dirname + "/successfullySaved.html");
});

app.get("/failSave", (req, res) => {
    res.sendFile(__dirname + "/failSave.html");
})

app.listen(3000, () => {
    console.log("Server is up and running!");
});