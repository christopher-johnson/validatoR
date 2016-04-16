library(jsonlite)
url <- '/tmp/test.json'
document <- fromJSON(txt=url)
intersect <- function(x, y) y[match(x, y, nomatch = 0)]
intersect(document$`?wdworklabel`, document$`?dbpworklabel`)