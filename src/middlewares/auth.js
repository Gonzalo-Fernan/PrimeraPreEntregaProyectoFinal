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
  if (req.session.user.role === "admin") {
    next()
  }else{
    return res.redirect("/login")
  }
}

export function authAdminOrPremium (req, res, next){
  if (req.session.user.role === "admin" || req.session.user.role === "premium") {
    next()
  }else if(req.session.user.role === "user"){
    return res.redirect("/login")

  }
}
