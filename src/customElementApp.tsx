import { convertToCustomElement } from './lib/CustomElementWrapper.tsx'
import App from './App'
import { AppProvider } from './context/AppContext'
import type { FormDocument, FormTemplate } from '@formbird/types'

// Create a wrapper component that includes the AppProvider
// eslint-disable-next-line react-refresh/only-export-components
const AppWithProvider = (props: Record<string, unknown>) => (
  <AppProvider
    initialDocument={props.document as FormDocument}
    initialTemplate={props.template as FormTemplate}
    initialFieldValue={props.fieldValue}
    initialFieldName={props.fieldName as string}
    initialFormParameters={props.formParameters as Record<string, unknown>}
    initialResponsiveLayout={props.responsiveLayout as string}
    initialMessage={props.message as string}
    initialComponentDefinition={props.componentDefinition as Record<string, unknown>}
    initialComponentProps={props.componentProps as Record<string, unknown>}
  >
    <App {...props} />
  </AppProvider>
)

// Convert the AppWithProvider component to a custom element
convertToCustomElement('custom-element-app', AppWithProvider)

// Export for potential use in other files
export default 'custom-element-app' 