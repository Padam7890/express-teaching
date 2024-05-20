
const login = async(req, res) => {
    try {
        const { email, password } = req.body;
    
        //EMAIL CHECK
    
        const checkemail = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
    
    
        if (!checkemail) {
          return res.status(400).json({
            error: "Email doesn't exist ",
            data: checkemail,
          });
        }
    
        //PASSWORD VALIDATION
        const checkPassword = await bcrypt.compare(password, checkemail.password);
    
        if (!checkPassword) {
          return res.status(400).json({
            error: "password does not match",
          });
        }
    
        // ACCESS TOKEN = 1=24 // REFRESH TOKRN  = 30 DAYS
        const acessToken = jwt
          .sign(
            {
              id: checkemail.id,
              roles: checkemail.roles
            },
            process.env.JWT_SECERT_KEY,
            {
              expiresIn: "1h",
            }
          )
    
          res.status(200).json({
            message: "User logged in successfully",
            data: checkemail,
            accesToken: acessToken,
          });
    
        //has password
      } catch (error) {
        console.log(error); //debuging 
        return res.status(500).json({
          message: "Error: Cannot save data",
          error: error,
        });
      }
}

module.exports = login;