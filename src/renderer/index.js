import 'menu-bar-component';
import 'db-viewer-component';
import './component/custom-dialog/CustomDialog.js';
import './component/table-dialog-component/TableDialogComponent.js';
import './component/welcome-dialog/WelcomeDialog.js';
import './style.css';
import './component/choose-db-dialog/ChooseDBDialog.js';

if (IS_ELECTRON) {
  import('./component/db-connection-dialog/DbConnectionDialog.js');
}

const types = [
  'int', 'string'
];

window.addEventListener('load', () => {
  const dbViewer = document.querySelector('db-viewer');
  const createTableBtn = document.querySelector('.create_table');
  const tableDialogElem = document.querySelector('table-dialog');
  const welcomeDialog = document.querySelector('welcome-dialog');
  const mainContainer = document.querySelector('.main_container');

  tableDialogElem.types = types;

  function setSchema(schema) {
    dbViewer.schema = schema;
  }

  dbViewer.addEventListener('tableDblClick', (event) => {
    tableDialogElem.open(dbViewer.schema, event.detail).then((result) => setSchema(result));
  });

  createTableBtn.addEventListener('click', () => {
    tableDialogElem.open(dbViewer.schema).then((result) => {
      if (result) {
        setSchema(result);
      }
    });
  });

  if (IS_ELECTRON) {
    import('./el-menu.js').then((module) => {
      module.default(() => dbViewer.schema, setSchema);
    });
  } else {
    import('./menu.js').then((module) => {
      module.default(() => dbViewer.schema, setSchema);
    });
  }
  mainContainer.style.visibility = 'hidden';
  welcomeDialog.getSchema().then((schema) => {
    mainContainer.style.visibility = 'visible';
    setSchema(schema);
  });
});
