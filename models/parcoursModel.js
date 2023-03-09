const mongoose = require ("mongoose");

const parcoursSchema = new mongoose.Schema(
    {
        name: {type: String, unique: true, required: true},
        duration: {type: Number, required: true}, // Number of days
        description: {type: String, required: true},
        price: {type: Number, required: true},
        picture: {type: String, required: true},
        difficulty: {type: Number, required: true},
        slug: String,
        steps:[{
            stepName: {type: String, required: true, unique: true},
            stepSlug: String,
            stepLatitude: {type: String, required: true},
            stepLongitude: {type: String, required: true},
            stepPicture: {type: String, required: true},
            stepDescription: {type: String, required: true}
        }]
    }
)

module.exports = mongoose.model("parcours", parcoursSchema);