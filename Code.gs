const ADMIN_PASSWORD = "admin"; // Change this to a secure password!

function doGet(e) {
  const sheetNames = ["Profile", "About", "Experience", "Skills", "Projects", "Services"];
  const result = {};
  
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    sheetNames.forEach(sheetName => {
      const sheet = ss.getSheetByName(sheetName);
      if (sheet) {
        const data = sheet.getDataRange().getValues();
        if (data.length > 0) {
          const headers = data[0];
          const rows = [];
          for (let i = 1; i < data.length; i++) {
            const rowObject = {};
            for (let j = 0; j < headers.length; j++) {
              rowObject[headers[j]] = data[i][j];
            }
            rows.push(rowObject);
          }
          result[sheetName.toLowerCase()] = rows;
        } else {
          result[sheetName.toLowerCase()] = [];
        }
      }
    });
    
    return ContentService.createTextOutput(JSON.stringify({ status: 'success', data: result }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const postData = JSON.parse(e.postData.contents);
    const { action, password, sheetName, payload } = postData;

    // Authentication Check
    if (password !== ADMIN_PASSWORD) {
      return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Unauthorized' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Auth only check
    if (action === "authenticate") {
      return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Authenticated' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Sheet not found' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (action === "add") {
      // payload should be an array of values matching the headers
      const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      const rowData = headers.map(header => payload[header] || "");
      sheet.appendRow(rowData);
    } 
    else if (action === "update") {
      // Requires payload to have 'id' or we update single row sheets like Profile/About directly
      const data = sheet.getDataRange().getValues();
      const headers = data[0];
      
      if (sheetName === "Profile" || sheetName === "About") {
         // Assuming single row data for Profile and About
         const rowData = headers.map(header => payload[header] || "");
         sheet.getRange(2, 1, 1, headers.length).setValues([rowData]);
      } else {
         const idIndex = headers.indexOf('id');
         if (idIndex > -1) {
           for (let i = 1; i < data.length; i++) {
             if (data[i][idIndex] == payload.id) {
               const rowData = headers.map(header => payload[header] || "");
               sheet.getRange(i + 1, 1, 1, headers.length).setValues([rowData]);
               break;
             }
           }
         }
      }
    }
    else if (action === "delete") {
       const data = sheet.getDataRange().getValues();
       const headers = data[0];
       const idIndex = headers.indexOf('id');
       
       if (idIndex > -1) {
         for (let i = 1; i < data.length; i++) {
           if (data[i][idIndex] == payload.id) {
             sheet.deleteRow(i + 1);
             break;
           }
         }
       }
    }

    return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: `Action ${action} completed successfully` }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Function to initialize the spreadsheet with required sheets and headers
function initializeSpreadsheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  const sheetsConfig = {
    "Profile": ["name", "role", "description", "imageURL", "github", "linkedin", "email", "phone", "instagram", "whatsapp"],
    "About": ["heading", "description", "resumeURL"],
    "Experience": ["id", "title", "company", "period", "description"],
    "Skills": ["id", "name", "percentage", "icon", "category"],
    "Projects": ["id", "title", "description", "imageURL", "liveLink", "githubLink"],
    "Services": ["id", "title", "description", "icon"]
  };
  
  for (const [sheetName, headers] of Object.entries(sheetsConfig)) {
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.appendRow(headers);
    }
  }
}
