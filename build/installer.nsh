!macro customInstall
  CreateDirectory $LOCALAPPDATA\app-pdf-ts
  CopyFiles $INSTDIR\databaseapp.db $LOCALAPPDATA\app-pdf-ts
  Delete $INSTDIR\databaseapp.db
!macroend