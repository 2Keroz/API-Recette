const mongoose = require("mongoose")

const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "le nom d'utilisateur est requis"],
    },
    email: {
        type: String,
        required: [true, "l'email est requis"],
        unique: true, // Ajout pour éviter les doublons d'email
    },
    password: {
        type: String,
        required: [true, "le mot de passe est requis"],
    },
    recettes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "recettes"
        }
    ]
});

// Middleware pour hacher le mot de passe avant de sauvegarder
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
