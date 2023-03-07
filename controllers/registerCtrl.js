const bcrypt = require('bcrypt');
const adminModel = require ("../models/adminsModel");
const guideModel = require ("../models/guidesModel");
const userModel = require ("../models/usersModel");

const mailRegExp = new RegExp("^[a-zA-Z0-9_!#$%&amp;'*+/=?`{|}~^-]+(?:\\.[a-zA-Z0-9_!#$%&amp;'*+/=?`{|}~^-]+)*@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$");
const passwordRegExp = new RegExp("^(.*[a-zA-Z0-9!@#$%^&*])$");

const secretKey = require ("../config/configSecretKey");

const dateFormatting = Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "long"
  });

const registerCtrl = 
{
    registerAdmin (req, res)
    {
        const {mail, password} = req.body;

        // Check if evertyhing is good (typeof, unemptiness, regexp validation)
        if (typeof(mail) !== "string" || typeof(password) !== "string")
        {
            return res.status(422).json({message: "Un ou plusieurs champs ne sont pas du bon type"});
        }
        if (mail === "" || password === "")
        {
            return res.status(422).json({message: "Un ou plusieurs champs sont vides"});
        }
        if (!mailRegExp.test(mail) || !passwordRegExp.test(password))
        {
            return res.status(422).json({message: "Adresse mail ou mot de passe incorrect"});
        }

        // Encrypt password to database
        const hashedPwd = bcrypt.hashSync(password, 10, (err, hash) =>
        {
            if (err)
            {
                return res.status(500).json({message: "Erreur inconnue"});
            }
            return hash;
        })

        // Save admin to the admins database
        let newAdmin = new adminModel(
        {
            mail:mail,
            password: hashedPwd,
            role: "admin"
        });
        
        newAdmin.save().then(()=>
        {
            return res.status(201).json({message: "Compte crée"});
        })
        .catch((err)=>
        {
            console.log(err);
            return res.status(422).json({message:"Une erreur inattendue est survenue"}); 
        })
    },
    registerGuide (req, res)
    {
        const {firstName, lastName, mail, password, description, experienceYears, profilePicture} = req.body;

        if (typeof(firstName) !== "string" || typeof(lastName) !== "string" || typeof(mail) !== "string" || typeof(password) !== "string" || typeof(description) !== "string")
        {
            return res.status(422).json({message: "Un ou plusieurs champs ne sont pas du bon type"})
        }
        if (firstName === "" || lastName === "" || mail === "" || password === "" || description === "")
        {
            return res.status(422).json({message: "Un ou plusieurs champs sont vides"})
        }
        if (!mailRegExp.test(mail) || !passwordRegExp.test(password))
        {
            return res.status(422).json({message: "Adresse mail ou mot de passe incorrect"});
        }

        // Encrypt password to database
        const hashedPwd = bcrypt.hashSync(password, 10, (err, hash) =>
        {
            if (err)
            {
                return res.status(500).json({message: "Erreur inconnue"});
            }
            return hash;
        })

        // Save guide to the guides database
        let newGuide = new guideModel(
        {
            firstName: firstName,
            lastName: lastName,
            mail: mail, 
            password: hashedPwd,
            description: description,
            experienceYears: experienceYears,
            profilePicture: profilePicture,
            state: "En attente",
            role: "guide"
        });

        newGuide.save().then(()=>
        {
            return res.status(201).json({message: "Compte crée"});
        })
        .catch((err)=>
        {
            console.log(err);
            return res.status(422).json({message:"Une erreur inattendue est survenue"}); 
        })
    },
    registerUser (req, res)
    {
        const {firstName, lastName, mail, password, profilePicture} = req.body;
        if (typeof(firstName) !== "string" || typeof(lastName) !== "string" || typeof(mail) !== "string" || typeof(password) !== "string")
        {
            return res.status(422).json({message: "Un ou plusieurs champs ne sont pas du bon type"})
        }
        if (firstName === "" || lastName === "" || mail === "" || password === "")
        {
            return res.status(422).json({message: "Un ou plusieurs champs sont vides"})
        }
        if (!mailRegExp.test(mail) || !passwordRegExp.test(password))
        {
            return res.status(422).json({message: "Adresse mail ou mot de passe incorrect"});
        }

        // Encrypt password to database
        const hashedPwd = bcrypt.hashSync(password, 10, (err, hash) =>
        {
            if (err)
            {
                return res.status(500).json({message: "Erreur inconnue"});
            }
            return hash;
        })

        // Save guide to the guides database
        let newUser = new userModel(
        {
            firstName: firstName,
            lastName: lastName,
            mail: mail, 
            password: hashedPwd,
            profilePicture: profilePicture,
            role: "user"
        });

        newUser.save().then(()=>
        {
            return res.status(201).json({message: "Compte crée"});
        })
        .catch((err)=>
        {
            console.log(err);
            return res.status(422).json({message:"Une erreur inattendue est survenue"}); 
        })
    }
}
module.exports = registerCtrl;