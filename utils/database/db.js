import mongoose from 'mongoose'

const connection = {};


async function connect() {
    if (connection.isConnected) {
      console.log('already connected');
      return;
    }

    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1) {
          console.log('use previous connection');
          return;
        }
        await mongoose.disconnect();
      }
      const db = await mongoose.connect(process.env.MONGODB_CLI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
       // useCreateIndex: true,
    });
    console.log('new connection');
    connection.isConnected = db.connections[0].readyState;

}


async function disconnect() {
    if (connection.isConnected) {
      if (process.env.NODE_ENV === 'production') {
        await mongoose.disconnect();
        connection.isConnected = false;
      } else {
        console.log('not disconnected');
      }
    }
  }


  function convertDocToObject(doc) {
    doc._id? doc._id = doc._id.toString() : null ;
    doc.createdAt? doc.createdAt =  doc.createdAt.toString()  : null ;
    doc.updatedAt? doc.updatedAt =  doc.updatedAt.toString()  : null ;
    doc.createdBy? doc.createdBy =  doc.createdBy.toString()  : null ;
    doc.Founded? doc.Founded =  doc.Founded.toString()  : null ;
    //doc.Founded ? doc.Founded =  doc.Founded.toString() : null ;
    doc.audio_features ?  doc.audio_features =  doc.audio_features.toString() : null ;
    doc.video_features ?  doc.video_features =  doc.video_features.toString() : null ;
    doc.display_features ? doc.display_features = doc.display_features.toString() : null ;   
    doc.connectivity_features ? doc.connectivity_features = doc.connectivity_features.toString() : null ;
    doc.smart_tv_features ? doc.smart_tv_features = doc.smart_tv_features.toString() : null ;
    doc.power_features ? doc.power_features = doc.power_features.toString() : null ;
    doc.dimensions ? doc.dimensions = doc.dimensions.toString() : null ;
    
   //
    doc.sizes? doc.sizes = doc.sizes.map( function( el ){ return JSON.stringify(el)  //JSON.stringify(el) //el.toString() 
     }) : null ;
    doc.productPictures ? doc.productPictures = doc.productPictures.map( function( el ){ return el.img }) : null ;
   

    return doc ; 
  }
  
  const db = { connect, disconnect, convertDocToObject };
  export default db;