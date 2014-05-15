/* Follow the following steps to install;
    - Click Resources -> Libraries
    - Enter the following code into "Find a Library"
      - "MvMPjfOa15AEN5pank2Gx_u_f9Eepb8L8"
    - A new entry of "FormNotificationAPI" will appear, choose the latest version in the "Version" drop down
    - Click "Save"
    - Save and close this script
    - Refresh the "Create Form" Google Drive page
    - Choose Configure -> Configure Email from the top menu    
*/
function formSubmit(e) {
  var newReference = FormNotificationAPI.formSubmit(e,PropertiesService.getScriptProperties().getProperties());
  if (newReference!=undefined) {
    PropertiesService.getScriptProperties().setProperty("referenceNumber", newReference)
  }
}

function onOpen() {
  FormNotificationAPI.onOpen();
}

function updatePreferences() {
  FormNotificationAPI.updatePreferences(PropertiesService.getScriptProperties().getProperties());
}

function doPost(eventInfo) {
  PropertiesService.getScriptProperties().setProperties(FormNotificationAPI.doPost(eventInfo));
  return UiApp.getActiveApplication().close();
}

function removeTriggers() {
  FormNotificationAPI.removeTriggers();
}
