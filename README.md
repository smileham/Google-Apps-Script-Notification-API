Google-Apps-Script-Notification-API
===================================

Few scripts to present as a library which can be imported into a Google form to enable custom response emails from a Google Form submission

Create the following files within a Google Apps Script Project called "FormNotificationAPI";
- Code.gs: Email generation code for form submits
- UI.gs: Admin interface for configuring the emails
- ResponseBody.html: slimline template for HTML generation

Create the "FormNotificationAPI" as a Google Apps Script Library (see https://developers.google.com/apps-script/guide_libraries)

Add the following code within a Google Apps Form Script and import the FormNotificationAPI library
- Stubs.gs: This is the file to create within a Google Apps Form script to call the FormNotificationAPI

Click "Configure -> Configure Email" in the menu which will appear at the top of your Google Form to set up the emails.

Once the Library has been created the following process can be followed;

- Create the Google Form
- The end user can create their Google Form as the want it to appear.
- Install the Script/API
- This could be completed by IT if the end user is happy to share the form (even temporarily);
- Load the Google Form
- From the top menu, click “Tools”, then “Script Editor”
- If a dialog box appears for “Google Apps Script” click “Blank Project” on the left.
- Paste the contents of the *Stubs.gs* file into the editor, replacing any current script;

- From the top menu, click “Resources”, then “Manage Libraries”
- Name your script in the dialog that appears, eg, “MyFormSubmit”, click “OK”
- Copy and paste the following “Project Key” into the “Find a Library” box;

*This will be different in your instance* MvMPjfOa15AEN5pank2Gx_u_f9Eepb8L8


- Click “Select”
- In the “Version” drop down, choose the latest version of the library.
- Click “Save”
- Close the “Script Editor” tab/window
- Close your Spreadsheet.

The following steps can be completed by the original user;
- Re-open your Form
- Once loaded, a new top level menu entry will appear next to “Help” saying “Configure” (this may take a few seconds”)
- From the top menu, click “Configure”, then “Configure Email”
- You will be prompted to allow the script the following permissions
-- Send Email
-- Script Properties (Read/Write)
-- This script asks permission to subscribe to external events.
- Click “OK”
- Click “Close” in the “Authorisation Status” window
- Go back to your Form, from the top menu, click “Configure”, then “Configure Email”
- You will now be asked a series of questions


|Question|Help Text|
|----|----|
|Notification List|Who do you want the automated email to be sent to, multiple email addresses can be entered, separated by a comma.|
|Email Subject|This will be the subject of the email, if your form includes a question labelled “Subject” this field will be appended to the email subject.|
|Email Header|This text will be put at the top of your email|
|Send Text Only|Send the content as Text Only rather than HTML|
|Send Form Content|Include the questions and answers in the email|
|Send Attachment|Send the responses to the form as an attachment on the email|
|Send Receipt|If you are capturing the Email of the submitter, this will send their responses back to them.|
|Include Reference Number|Add a unique reference number to the email.|
|Dynamic Routing|If checked, this will look for email address in the responses to questions and also include them in notification emails|

- Once you have completed these steps, the next submission to your form should be emailed to you.
