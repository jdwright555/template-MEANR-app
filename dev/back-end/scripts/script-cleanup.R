library(rmongodb)
library(RJSONIO)

cleanup <- function () {
  
  mongo <- mongo.create()
  if (mongo.is.connected(mongo)) {
   
    # delete data
    mongo.drop(mongo, "contactdb.planners")
  
    # close connection
    mongo.destroy(mongo)
  }
  
  message <- "Tables deleted"
  return(toJSON(message))
}
