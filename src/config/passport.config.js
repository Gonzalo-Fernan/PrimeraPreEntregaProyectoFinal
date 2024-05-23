import passport from "passport";
import local from "passport-local";
import userModel from "../dao/models/userModel.js";
import { createHash, isValidPassword } from "../utils.js";
import GitHubStrategy from "passport-github2";
import CartService from "../dao/services/cartService.js";
import cartsModel from "../dao/models/carts.js";


const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use("register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;

        try {
          const user = await userModel.findOne({ email: username });
          if (user) {
            console.log("el usuario ya existe");
            return done(null, false)
          }
          const cartService = new CartService()
          const cart = await cartService.createCart()
          let role = email === "adminCoder@coder.com"? "admin" : "user"

          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            role,
            cart: cart
          };

          // Guardar el usuario
          const result = await userModel.create(newUser);
          
          return done(null, result); 
        } catch (error) {
          return done(error)
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (!user) return done(null, false);
          const valid = isValidPassword(user, password);
          if (!valid) return done(null, false);

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
 //estrategia para github
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.d9a73477f8887a29", //id de la app en github
        clientSecret: "0cbfa36279ae9e58192f4db3ea356ce85d42e558", //clave secreta de github
        callbackURL: "http://localhost:8080/api/sessions/githubcallback", //url callback de github
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile); //obtenemos el objeto del perfil
          //buscamos en la db el email
          const user = await userModel.findOne({
            email: profile._json.email,
          });
          //si no existe lo creamos
          if (!user) {
            //contruimos el objeto según el modelo (los datos no pertenecientes al modelo lo seteamos por default)
            const newUser = {
              first_name: profile._json.name,
              last_name: "",
              age: 20,
              email: profile._json.email,
              password: "",
              role:"user"
            };
            //guardamos el usuario en la database
            let createdUser = await userModel.create(newUser);
            return done(null, createdUser);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //Serializar y deserializar usuario

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

export default initializePassport;