const cleanArrayProduct = (chocolate) => {
    return {
    	id: chocolate.id,
        name: chocolate.name,
        price: chocolate.price,
        stock: chocolate.stock,
        image: chocolate.image,
        score: chocolate.score.currentScore,
        categories: chocolate.categories.map((category)=>category.name),
        types: chocolate.types.map((type)=>type.name),
        ingredients: chocolate.ingredients.map((ingredient)=>ingredient.name),
        create: chocolate.create,
    };
};
  
module.exports = {cleanArrayProduct}