
module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        nom: String,
        email: String,
        // idOffres:Object,
        telecharger_votre_cv:Object,
        posted: Boolean
      },
      { timestamps: true },
 
      
    );
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Poste = mongoose.model("poste", schema);
    return Poste;
  };