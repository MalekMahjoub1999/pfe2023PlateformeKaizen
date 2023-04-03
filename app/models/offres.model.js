
module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
        // titulaire:Object,
        description_générale: String,
        date_debut_candidature:String,
        date_fin_candidature:String,
        département:String,
        nom_société:String,
        salaire:String,
      experience:String,
      nbreCandidat:String,
      typeContrat:String,
      compétence:String,
    genre:String,
        published: Boolean
      },
      { timestamps: true },
 
      
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Offres = mongoose.model("offres", schema);
    return Offres;
  };