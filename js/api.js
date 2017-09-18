function caller(protocol,uri,data,fn){
  $.ajax({
      url: apiURL+uri,
      type: protocol,
      data: data,
      success: fn
  });
}