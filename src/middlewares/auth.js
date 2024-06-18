export  function auth (req, res, next) {
    if (!req.session || !req.session.user) {
      return res.redirect("/login")
    }
    next()
  }

export function authUser (req, res, next){
  if (!req.session || !req.session.user || req.session.user.role !== "user") {
    return res.redirect("/login")
  }
  next()
}

export function authAdmin (req, res, next){
  if (!req.session || !req.session.user || req.session.user.role === "admin" || req.session.user.role === "premium") {
    return res.redirect("/login")
  }
  next()
}

