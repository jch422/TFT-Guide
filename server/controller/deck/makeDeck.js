const { users ,decks, decks_champions, champions  } =  "../../models/index"

module.exports = async(req,res) =>{

    const {deck_id, champions} = req.body

    let {accessToken} = req.cookie
    let data = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`)
    let email = data.email

    const user_id = await users.findOne({
        attributes: [id],
        where: {
            email = email 
        }
    })
}