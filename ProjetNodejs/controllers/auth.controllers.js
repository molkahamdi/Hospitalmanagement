const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Doctor = require('../models/docter');
const Patient = require('../models/patient');
const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';
exports.register = async (req, res) => {
    try {
      const { nom, email, password, role, telephone, adresse, specialite, tarif } = req.body;

      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(400).json({ message: "Cet email est déjà utilisé." });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      let newUser;
  
      if (role === 'doctor') {
        newUser = new Doctor({ nom, email, password: hashedPassword, role, specialite, tarif });
      } else if (role === 'patient') {
        newUser = new Patient({ nom, email, password: hashedPassword, role, telephone, adresse });
      } else {
        newUser = new User({ nom, email, password: hashedPassword, role });
      }
  
      await newUser.save();
      res.status(201).json({ message: "Inscription réussie", user: newUser });
  
    } catch (err) {
      res.status(500).json({ message: "Erreur lors de l'inscription", error: err });
    }
  };
  



exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // ✅ This will match doctor, patient, admin from one collection
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: "Email ou mot de passe incorrect." });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Email ou mot de passe incorrect." });
      }
  
      // ✅ Show role in console
      console.log("Logging in as:", user.role);
  
      // ✅ Token includes correct role
      const token = jwt.sign(
        {
          userId: user._id,
          role: user.role,
          email: user.email,
          nom: user.nom // ✅ include nom in token
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      
  
      res.status(200).json({ token, user });
  
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la connexion", error });
    }
  };

exports.authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({ message: "Accès non autorisé." });
    }

    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res.status(401).json({ message: "Format du token invalide." });
    }

    try {
        const token = tokenParts[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalide.", error });
    }
};


exports.getProfile = async (req, res) => {
    try {
        
        let user;
        if (req.user.role === 'doctor') {
            user = await Doctor.findById(req.user.userId).select('-password');
        } else if (req.user.role === 'patient') {
            user = await Patient.findById(req.user.userId).select('-password');
        } else {
            user = await User.findById(req.user.userId).select('-password');
        }

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du profil", error });
    }
};




  

