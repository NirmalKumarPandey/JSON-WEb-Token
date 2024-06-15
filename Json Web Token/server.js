let mongoose = require("mongoose");
let express = require("express");
let cors = require("cors");
let multer = require('multer');
var jwt = require('jsonwebtoken');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        console.log(file);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });


let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/uploads", express.static("uploads"));


let userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: String,
    password: String,
    mobile: String,
    profilePic: String,
})
let User = new mongoose.model("user", userSchema);


app.post("/register", upload.single("profilePic"), async (req, res) => {
    // console.log(req.body);

    try {
        let newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            email: req.body.email,
            password: req.body.password,
            mobile: req.body.mobile,
            profilePic: req.file.path,
        })
        await User.insertMany([newUser]);

        res.json({ status: "Success", msg: "User Created Successfully" });

    }
    catch (err) {
        res.status(500).json({ status: "Failure", msg: "Unable to create User", err: err });

    }
    console.log(req.file);
    console.log(req.body);
    //  res.json(["User created successfully"]);

});
app.post("/login", upload.none(), async (req, res) => {
    console.log(req.body);
    let userDetailsArr = await User.find().and({ email: req.body.email });
    if (userDetailsArr.length > 0) {
        if (userDetailsArr[0].password == req.body.password) {
            // We try to Encript it
            let encriptedCredential = jwt.sign({ email: req.body.email, password: req.body.password }, "election");
            // We try to Encript it
            let loggedInUserDetails = {
                firstName: userDetailsArr[0].firstName,
                lastName: userDetailsArr[0].lastName,
                age: userDetailsArr[0].age,
                email: userDetailsArr[0].email,
                mobile: userDetailsArr[0].mobile,
                profilePic: userDetailsArr[0].profilePic,
                token: encriptedCredential
            }
            res.json({ status: "success", data: loggedInUserDetails });
            //  res.json({ status: "success", data: userDetailsArr[0] });
        }
        else {
            res.json({ status: "failure", msg: "Password does not correct /Invalid Password" });
        }
    }
    else {
        res.json({ status: "failure", msg: "User does not exist" });
    }
});
// Read the token....
app.post("/validateToken", upload.none(), async (req, res) => {
    console.log(req.body.token);
    // Here Decript the token...
    let decryptedCredential = jwt.verify(req.body.token, "election");
    console.log(decryptedCredential);
    // Copy  code...
    // User can read decryptedCredential.....
    let userDetailsArr = await User.find().and({ email: decryptedCredential.email });
    if (userDetailsArr.length > 0) {
        if (userDetailsArr[0].password == decryptedCredential.password) {
            // We try to Encript it

            // I do not need this .....and also remove token
            //   let encriptedCredential = jwt.sign({ email: req.body.email, password: req.body.password }, "election");
            // We try to Encript it
            // also remove token ----token: encriptedCredential
            let loggedInUserDetails = {
                firstName: userDetailsArr[0].firstName,
                lastName: userDetailsArr[0].lastName,
                age: userDetailsArr[0].age,
                email: userDetailsArr[0].email,
                mobile: userDetailsArr[0].mobile,
                profilePic: userDetailsArr[0].profilePic,

            }
            res.json({ status: "success", data: loggedInUserDetails });
            //  res.json({ status: "success", data: userDetailsArr[0] });
        }
        else {
            res.json({ status: "failure", msg: "Password does not correct /Invalid Password" });
        }
    }
    else {
        res.json({ status: "failure", msg: "User does not exist" });
    }
    // Copy  code...

    res.json({ status: "received token" });

});
app.listen(4567, () => {
    console.log("Listening to port 4567");
})



let connectToTheMongoDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Batch2401");
        console.log("Successfully connected to Mongo Database");
    }
    catch (err) {
        console.log("Unable to connect MDB" + err);
    }
}
connectToTheMongoDB();
