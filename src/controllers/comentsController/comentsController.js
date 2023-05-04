const { Coment, User, Product } = require("../../db")

const getComents = async (id, page) => {
    const size = 3
    let options = {
        order: [['createdAt', 'DESC']],
        limit: +size,
        offset: (+page) * (+size)
    }

    const { count, rows } = await Coment.findAndCountAll({
        where: { productId: id },
        ...options
    }
    )
    console.log(rows);
    return rows
}

const commentsDeleted = async (productId) => {
    console.log("llegue " + productId);
    const comments = await Coment.findAll({
        where: {
            productId: productId,
            deletedAt: null
        }
    });
    console.log(comments);
    return comments
}

const postComent = async (userId, content, productId) => {
    const user = await User.findByPk(userId)
    const product = await Product.findByPk(productId)
    console.log(user.dataValues)
    const newComent = await Coment.create({
        name: user.dataValues.name + ' ' + user.dataValues.surname,
        content: content,
        userId: user.id,
        productId: product.id,
        image: user.image
    })
    return newComent
}

const putComent = async (userId, comentId, content) => {
    const updatedComent = await Coment.update({ content: content }, {
        where: {
            id: comentId,
            userId: userId
        }
    })
    const findComment = await Coment.findAll({
        where: {
            id: comentId
        }
    })
    return findComment
}

const updateAllComents = async (userId, content) => {
    if (content.name || content.surname) {
        const user = await User.findByPk(userId)
        const name = user.name + ' ' + user.surname
        console.log(name + " ESTE ES EL NOMBRE");
        const comentUpdated = await Coment.update({ name: name }, {
            where: { userId: userId }
        })
        return comentUpdated
    }
    else {
        console.log(userId);
        //console.log(image);
        console.log(content);
        const nombre = Object.keys(content)[1]
        const newImagesAllComents = await Coment.update({ [nombre]: content[nombre] }, {
            where: { userId: userId }
        })

        return newImagesAllComents
    }
}

const deleteComent = async (userId, comentId) => {

    const deletedComent = await Coment.destroy({
        where: {
            id: comentId,
        }
    })

    return deletedComent
}

module.exports = {
    getComents,
    postComent,
    putComent,
    deleteComent,
    updateAllComents,
    commentsDeleted
}