
// CREATION DU ROUTER - OK
const recetteModel = require("../Models/recetteModel");
const recetteRouter = require("express").Router()
const authenticateToken = require("../authMiddleware");
// CREATION DES ROUTES - OK
// Requête POST pour ajouter une recette protégée par JWT
recetteRouter.post("/recettes", authenticateToken, async (req, res) => {
    try {
        const newRecette = new recetteModel(req.body);
        await newRecette.save();
        res.json(newRecette);
    } catch (err) {
        res.json(err);
    }
});


// Requete pour avoir toutes les recettes - OK
recetteRouter.get("/recettes", async (req, res) => {
    try {
        const recette = await recetteModel.find()
        res.json(recette)
    } catch (err) {
        res.json(err)
    }
})

// Requete pour avoir les recettes par ID - OK
recetteRouter.get("/recettes/id/:id",async (req, res) => {
    try {
        const recette = await recetteModel.findById({_id: req.params.id})
        res.json(recette)
    }
    catch{
        res.json({ message: "aucune recette trouvée" })
    }})


// Requete pour avoir les recettes par titre - OK
recetteRouter.get("/recettes/title/:title",async (req, res) => {
    try {
        const recette = await recetteModel.find({ title: req.params.title })
        res.json(recette)
    }
    catch{
        res.json({ message: "aucune recette trouvée" })
    }})


// Requete pour avoir les recettes par ingrédients - OK
recetteRouter.get("/recettes/ingredients/:ingredients", async (req, res) => {
    try {
        const ingredientsArray = req.params.ingredients.split(',');
        const recette = await recetteModel.find({ ingredients: { $in: ingredientsArray } })
        res.json(recette)
    }
    catch {
        res.json({ message: "aucune recette trouvée" })
    }
})


// Requete pour avoir les recettes par catégorie - OK
recetteRouter.get("/recettes/category/:category", async (req, res) => {
    try {
        const recette = await recetteModel.find({ category: req.params.category })
        res.json(recette)
    }
    catch{
        res.json({ message: "aucune recette trouvée" })
    }})



//Requete pour supprimer une recette - OK
recetteRouter.delete("/recettes/id/:id",async(req,res) =>{
    try {
        const recette = await recetteModel.deleteOne({
            _id: req.params.id
        })
        res.json(recette)
    } catch (err) {
        res.json(recette)
    }
})

// Requete pour modifier une recette - OK

recetteRouter.put("/recettes/:id", async (req, res) => {
    try {
        await recetteModel.updateOne({ _id: req.params.id }, req.body)
        res.json({
            message: "La recette a bien été modifié"
        })
    } catch (err) {
        res.json(err)
    }
})



module.exports = recetteRouter