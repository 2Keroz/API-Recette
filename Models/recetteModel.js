const mongoose = require("mongoose")

const recetteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "le titre de la recette est requis"]
    },
    ingredients: {
        type: [String],
    },
    instructions: {
        type: String,
        required: [true, "les instrictions sont requises"]
    },
    preparation_time: {
        type: Number,
        required: [true, "le temps de préparation est requis"]
    },
    cooking_time: {
        type: Number,
        required: [true, "le temps de cuisson est requis"]
    },
    difficulty: {
        type: String,
        required: [true, "la difficulté est requise"]
    },
    category: {
        type: String,
        required: [true, "la catégorie est requise"]
    },
})

const recetteModel = mongoose.model("recettes", recetteSchema)

module.exports = recetteModel
