/**
* Add configuration menus to the Form UI
*/
function onOpen() {
  
   FormApp.getUi()
       .createMenu('Configure')
       .addItem('Configure Email', 'updatePreferences')
       .addItem('Uninstall', 'removeTriggers')
       .addToUi();
 }

/**
* Shows the UI allowing the user to configure the project preferences for the script
*
* @param {object} project properties to use
*/
function updatePreferences(properties) {
  
  if (properties==undefined || properties.notificationList==undefined) {
     var properties = {
       "notificationList" : "",
       "emailSubject" : "",
       "emailHeader" : "",
       "sendAttachment" : "false",
       "sendTextOnly" : "false",
       "sendContent" : "false",
       "sendReceipt" : "false",
       "includeReference" : "false"
     };
  }
  
  var theUi = FormApp.getUi();
  var app = UiApp.createApplication().setTitle("Configure Preferences");
  
  var thePanel = app.createFormPanel().setWidth("100%");
  var theFlow  = app.createFlowPanel().setWidth("100%");
 
  var notificationListBox = app.createTextBox().setValue(properties.notificationList).setName('notificationListBox').setWidth("100%");
  var emailSubjectBox = app.createTextBox().setValue(properties.emailSubject).setName('emailSubjectBox').setWidth("100%");
  var emailHeaderBox = app.createTextArea().setValue(properties.emailHeader).setName('emailHeaderBox').setWidth("100%").setHeight("50px");
  var sendTextOnlyCheckBox = app.createCheckBox().setValue(properties.sendTextOnly=="true").setName('sendTextOnlyCheckBox').setWidth("100%");
  var sendContentCheckBox = app.createCheckBox().setValue(properties.sendContent=="true").setName('sendContentCheckBox').setWidth("100%");
  var sendReceiptCheckBox = app.createCheckBox().setValue(properties.sendReceipt=="true").setName('sendReceiptCheckBox').setWidth("100%");
  var sendAttachmentCheckBox = app.createCheckBox().setValue(properties.sendAttachment=="true").setName('sendAttachmentCheckBox').setWidth("100%");
  var includeReferenceCheckBox = app.createCheckBox().setValue(properties.includeReference=="true").setName('includeReferenceCheckBox').setWidth("100%");

  var submitButton = app.createSubmitButton("Update").setWidth("100%");
  
  var auth = false;
  var owner = DocsList.getFileById(FormApp.getActiveForm().getId()).getOwner();
  if (owner==Session.getActiveUser().getEmail()) {
    theFlow.add(app.createLabel("You have access to administer this form"));
    auth=true;
  }
  else {
    theFlow.add(app.createLabel("Please contact "+owner+" to change these settings"));
  }
  
  var theEmailGrid = app.createGrid(2,2).setWidth("100%").setColumnStyleAttribute(0, "width", "20%")
  .setText(0, 0, "Notification List:")
  .setWidget(0, 1, notificationListBox)
  .setText(1,0,"Email Subject")
  .setWidget(1, 1, emailSubjectBox);
  
  theFlow.add(theEmailGrid).add(app.createLabel("Email Header:").setWidth("100%")).add(emailHeaderBox);
  
  
  var theCheckGrid = app.createGrid(3, 4)
  .setText(0, 0, "Send Text Only:")
  .setWidget(0, 1, sendTextOnlyCheckBox)
  .setText(0, 2, "Send Form Content:")
  .setWidget(0, 3, sendContentCheckBox)
  .setText(1, 0, "Send Attachment:")
  .setWidget(1, 1, sendAttachmentCheckBox)
  .setText(1, 2, "Send Receipt:")
  .setWidget(1, 3, sendReceiptCheckBox)
  .setText(2, 0, "Include Reference Number:")
  .setWidget(2, 1, includeReferenceCheckBox);
  
  theFlow.add(theCheckGrid);
  
  if (auth) {theFlow.add(submitButton);}
  
  thePanel.add(theFlow);
  
  app.add(app.createScrollPanel(thePanel).setSize("100%", "100%"));
  
  theUi.showDialog(app);
}

/**
* Update the properties for the script
*
* @param {object} the submit event
* @return {object} new properties based on the form submission.
*/
function doPost(eventInfo) {
  
  var properties = {
    "notificationList" : eventInfo.parameter.notificationListBox,
    "emailSubject" : eventInfo.parameter.emailSubjectBox,
    "emailHeader" : eventInfo.parameter.emailHeaderBox,
    "sendTextOnly" : eventInfo.parameter.sendTextOnlyCheckBox=="on"?true:false,
    "sendContent" : eventInfo.parameter.sendContentCheckBox=="on"?true:false,
    "sendReceipt" : eventInfo.parameter.sendReceiptCheckBox=="on"?true:false,
    "sendAttachment" : eventInfo.parameter.sendAttachmentCheckBox=="on"?true:false,
    "includeReference" : eventInfo.parameter.includeReferenceCheckBox=="on"?true:false
  };
      
  /* Update the Trigger */
  if (ScriptApp.getProjectTriggers().length==0) {
    ScriptApp.newTrigger('formSubmit')
    .forForm(FormApp.getActiveForm())
    .onFormSubmit()
    .create();
  }
 
  return properties;
}

function removeTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i=0; i< triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
}
