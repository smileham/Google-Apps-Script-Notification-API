function formSubmit(e, properties) {
  
  try {
    
    var notificationList = properties.notificationList;
    var emailSubject = properties.emailSubject;
    var emailHeader = properties.emailHeader;
    var sendContent = properties.sendContent=="true"?true:false;
    var sendReceipt = properties.sendReceipt=="true"?true:false;
    var sendTextOnly = properties.sendTextOnly=="true"?true:false;
    var includeReference = properties.includeReference=="true"?true:false;
    var sendAttachment = properties.sendAttachment=="true"?true:false;
    
    var currentReferenceNumber = 0;
    
    if (includeReference && properties.referenceNumber!=undefined) {
        currentReferenceNumber = Number(properties.referenceNumber);
      }
      
    if (sendContent || sendAttachment) {
      
      var theFormObject = {};
      theFormObject["TIMESTAMP"]=e.response.getTimestamp().toUTCString();
      theFormObject["USERNAME"]=e.response.getRespondentEmail();
      var responseTable= '<table style="border-spacing: 5px 0; width:100%"><tr><th style="background-color:#C0C0C0">Question</th><th style="background-color:#C0C0C0">Answer</th></tr>';
      var responseText ="";
      
      if (theFormObject["USERNAME"]!=undefined && theFormObject["USERNAME"]!="") {
        responseTable+='<tr><td>From</td><td><a href="mailto:'+theFormObject["USERNAME"] +'">'+theFormObject["USERNAME"]+'</a></td></tr>';
        responseText='From : '+theFormObject["USERNAME"]+'\n'
      }
      responseTable+='<tr><td style="background-color:#f6f6f6;">Submit Date</td><td style="background-color:#f6f6f6;">'+theFormObject["TIMESTAMP"]+'</td></tr>';
      responseText+='Submit Date : ' + theFormObject["TIMESTAMP"] +'\n';
      
      var itemResponses = e.response.getItemResponses();
      var i=0;
      
      for (var j = 0; j < itemResponses.length; j++) {
        var itemResponse = itemResponses[j];
        
        if (itemResponse.getResponse()!="") {
          i++;
          responseTable+='<tr><td valign="top" style="white-space:nowrap;'+(i%2==0?'background-color:#f6f6f6;':'')+'">'+itemResponse.getItem().getTitle()+'</td>'+
            '<td valign="top" '+(i%2==0?'style="background-color:#f6f6f6;"':'')+'>';
          responseText+=itemResponse.getItem().getTitle()+' : ';
          
          if( Object.prototype.toString.call( itemResponse.getResponse() ) === '[object Array]' ) {
            for (var k=0; k<itemResponse.getResponse().length; k++) {
              responseTable+= itemResponse.getResponse()[k]+'<br />';
              if (k!=itemResponse.getResponse().length-1) {
                responseText+= itemResponse.getResponse()[k]+', ';
              }
              else {
                responseText+= itemResponse.getResponse()[k]+'\n';
              }
            }
          }
          else {
            responseTable += itemResponse.getResponse().replace(/\n/g, '<br />');
            responseText  += itemResponse.getResponse()+'\n';
          }
          
          responseTable+='</td></tr>';
        }
      }
      responseTable+="</table>";
    }
    if (!sendContent) {
      var responseTable = "<p>"+emailSubject+" has a new submission</p>";
    }
    
    
    var theResponse = HtmlService.createTemplateFromFile('ResponseBody');
    theResponse.header = emailHeader;
    theResponse.responseTable = responseTable;
    
    responseText = emailHeader+'\n'+responseText
    
    if (sendReceipt && theFormObject["USERNAME"]!="") {
      notificationList=theFormObject["USERNAME"]+","+notificationList;
    }
    if (includeReference) {
      emailSubject+=' - '+currentReferenceNumber;
    }
    
    var mailObject = {
      to: notificationList,
      subject: emailSubject,
      noReply: true
    };
    
    if (sendAttachment) {
      var theBlob = Utilities.newBlob(responseText, "text/plain", emailSubject+'.txt');
      mailObject.attachments=theBlob;
    }
    
    if (sendTextOnly) {
      if (!sendContent) {
        mailObject.body = emailSubject+" has a new submission\n";
      }
      else {
        mailObject.body=responseText;
      }
    }
    else {
      mailObject.htmlBody=theResponse.evaluate().getContent();
    }
    MailApp.sendEmail(mailObject);
    
    return currentReferenceNumber+1;
  }
  catch(e) {
    MailApp.sendEmail(PropertiesService.getScriptProperties().getProperty("errorLogEmail"), "Error in FormNotificationAPI", e);
  }
}
