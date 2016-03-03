##### THIS SCRIPT PRODUCES A BIRTHDAY PLANNER FROM YOUR LIST OF CONTACTS #####

# loads libraries
library(rmongodb)
library(lubridate)

# set up connection to mongo
host<-"localhost" #This can be found using the getHostName() function in mongo
username <- ""
password <- ""
db <- "contactdb"
mongo<-mongo.create(host=host , db=db, username=username, password=password)

if (mongo.is.connected(mongo)) {

  # get contacts data
  collection_in <- "contacts"
  namespace_in  <- paste(db, collection_in, sep=".")
  Contacts <- mongo.find(mongo, ns=namespace_in)
  Contacts <- mongo.cursor.to.data.frame(Contacts, stringsAsFactors = FALSE)
  
  # reformats dob to a Date format 
  Contacts$dob <- as.Date(Contacts$dob)
  
  ages_ty <- floor(as.numeric(Sys.Date() - Contacts$dob)/365)
  ages_ny <- ages_ty + 1
  
  birthday_planner <- function(dob) {
    
    bd_ty <- as.Date(paste(year(Sys.Date()), month(dob), day(dob), sep = "-"))
    bd_ny <- as.Date(paste(year(Sys.Date())+1, month(dob), day(dob), sep = "-"))
  
    if (Sys.Date() <= bd_ty) {
      days_to_bd <- as.numeric(bd_ty - Sys.Date())
    } else {
      days_to_bd <- as.numeric(bd_ny - Sys.Date())
    }
    
    return(days_to_bd)
  }
  
  days_to_bd <- unlist(lapply(Contacts$dob, birthday_planner))
  
  # outputs
  bd_planner_df <- data.frame(Contacts$firstname, Contacts$lastname, days_to_bd, ages_ny, stringsAsFactors = FALSE)
  names(bd_planner_df) <- c("firstname", "lastname", "days_to_bd", "ages_ny")
  
  # Our output dataframe cursor needs to be conversted to bson 
  bd_planner <- lapply(split(bd_planner_df, 1:nrow(bd_planner_df)), function(x) mongo.bson.from.list(x))
  # We now insert into mongo
  collection_out <- "planners"
  namespace_out <- paste(db, collection_out, sep=".")
  mongo.insert.batch(mongo, namespace_out, bd_planner)

  # close connection
  mongo.destroy(mongo)
}