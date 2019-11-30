import DatasetModel from "../models/dataset.model";
export const getPage = (data: DatasetModel[]) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="./styles.css" />
      </head>
      <body>
        <div id="container"></div>
    
        <script> 
            const data = ${data}
        </script>
        <script src="./timeago.full.min.js" type="text/javascript"></script>
        <script src="./barChartRace.js"></script>
    
        <script src="./index.js"></script>
      </body>
    </html>
    `;
};
