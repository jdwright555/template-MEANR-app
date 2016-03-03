master <- function (pathObj) {

  # loads libraries
  library(RJSONIO)

  # sets path for scripts    
  pathObj = fromJSON(pathObj)   # takes current path (.../routes) as input, converts from JSON to R vector 
  pathname <- pathObj           # removes names
  names(pathname) <- c()        # 
  pathname <- gsub("routes", "scripts", pathname, ignore.case=FALSE, fixed=FALSE)   # changes to .../scripts
  setwd(pathname)

  # executes analysis scripts  
  source("script-module1.R")
  # call additional scripts below...

  # returns completion message  
  res <- "Planner generated"
  return(toJSON(res))
}
