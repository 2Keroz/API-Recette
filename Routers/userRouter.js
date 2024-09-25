const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const userRouter = require("express").Router();

// Clé secrète pour générer les tokens (vous devriez utiliser une variable d'environnement pour la sécurité)
const JWT_SECRET = "tokenapi";

// Route de inscription
userRouter.post("/users", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = new userModel({ username, email, password });
        await user.save();

        res.json({ message: "Utilisateur créé avec succès" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err });
    }
});

// Route de connexion
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Utilisateur non trouvé" });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Mot de passe incorrect" });
        }

        // Générer le token JWT
        const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        
        res.json({ token, message: "Connexion réussie" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err });
    }
});

module.exports = userRouter;
