# MEANR application

This repository contains the code behind a very basic MEAN stack application with additional R capability. It is intended to be used as an extendible/customisable template by those wishing to integrate the functionality of R into a MEAN stack application.

**Pre-requisites**

MEAN stack components:
* MongoDB
* NodeJS (plus NPM, recommended)

R packages:
* RServe - must be running in the background to allow the Node API to call R scripts
* rmongodb - allows R to connect to a MongoDB instance
* RJSONIO - parses JSON statements into R vectors and vice versa
* lubridate (this app only) - used for date manipulation by the example script included here, not required by MEANR stack 